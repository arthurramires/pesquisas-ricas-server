import { Op } from 'sequelize';
import * as Yup from 'yup';
import Quiz from '../models/Quiz';
import Participant from '../models/Participant';
import Template from '../models/Template';
import Queue from '../../lib/Queue'

class QuizController {
  async index(req, res) {
    const { userId: user_id } = req;

    const data = await Quiz.findAll({
      where: { user_id },
      attributes: ['id', 'start', 'ending', 'status']
    });

    return res.json(data);
  }

  async store(req, res) {
    const { userId: user_id } = req;

    const schema = Yup.object().shape({
      template_id: Yup.string().required(),
      start: Yup.date(),
      ending: Yup.date()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { template_id, start = null, ending = null } = req.body;

    const { id, status } = await Quiz.create({
      user_id,
      template_id,
      start,
      ending
    });

    return res.json({
      id,
      template_id,
      start,
      ending,
      status
    });
  }

  async update(req, res) {
    const { id } = req.params;

    const quiz = await Quiz.findByPk(id);

    await quiz.update(req.body);

    const { start, ending, status } = await Quiz.findByPk(id);

    return res.json({
      id,
      start,
      ending,
      status
    });
  }

  async participants(req, res) {
    const { id } = req.params;

    const participants = await Participant.findAll({
      where: { quiz_id: id },
      attributes: ['id', 'fields', 'answers', 'status']
    });

    return res.json(participants);
  }

  async setParticipants(req, res) {
    const { id: quiz_id } = req.params;

    const schema = Yup.object().shape({
      participants: Yup.array().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { participants } = req.body;

    const data = await Promise.all(
      participants.map(fields =>
        Participant.create({
          quiz_id,
          fields
        })
      )
    );

    return res.json(data);
  }

  async sendMail(req, res) {
    const { id: quiz_id } = req.params;

    const participants = await Participant.findAll({
      where: { quiz_id, status: { [Op.lte]: 1 } },
      attributes: ['id', 'fields', 'password']
    });

    await Promise.all(
      participants.map(participant =>
        Queue.add('SendMailToParticipant', participant)
      )
    );

    return res.json(participants);
  }

  async participant(req, res) {
    const { password } = req.params;

    const participant = await Participant.findOne({
      where: { password },
      attributes: ['id', 'status'],
      include: [
        {
          model: Quiz,
          as: 'quiz',
          attributes: ['id', 'status'],
          include: [
            {
              model: Template,
              as: 'template',
              attributes: ['slug']
            }
          ]
        }
      ]
    });

    const { id, status, quiz } = participant;

    if (status <= 1) {
      participant.update({ status: 2 });
    }

    return res.json({ id, status, quiz });
  }

  async answers(req, res) {
    const { id } = req.params;

    const schema = Yup.object().shape({
      answers: Yup.array().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { answers } = req.body;

    const participant = await Participant.findByPk(id);

    const { status } = await participant.update({ answers, status: 3 });

    return res.json({ status });
  }
}

export default new QuizController();
