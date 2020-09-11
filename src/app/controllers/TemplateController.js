import * as Yup from 'yup';
import Template from '../models/Template';

class TemplateController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name, slug } = await Template.create(req.body);

    return res.json({
      id,
      name,
      slug
    });
  }
}

export default new TemplateController();
