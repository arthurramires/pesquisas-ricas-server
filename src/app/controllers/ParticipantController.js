import * as Yup from 'yup';
import Participant from '../models/Participant';
import Queue from '../../lib/Queue'

class ParticipantController {
  async update(req, res) {
    const { id } = req.params;

    const schema = Yup.object().shape({
      fields: Yup.object().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const participant = await Participant.findByPk(id);

    const { fields } = req.body;

    const { answers, status } = await participant.update({ fields });

    return res.json({
      id,
      fields,
      answers,
      status
    });
  }

  async sendMail(req, res) {
    const { id } = req.params;

    const participant = await Participant.findByPk(id, {
      attributes: ['id', 'fields', 'password']
    });

    await Queue.add('SendMailToParticipant', participant);

    return res.json(participant);
  }
}

export default new ParticipantController();
