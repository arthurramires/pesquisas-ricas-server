import Mail from '../../lib/Mail';

export default {
  key: 'SendMailToParticipant',
  options: {
    delay: 1000,
    attempts: 3,
  },
  async handle({ data }) {
    const { fields, password } = data;

    const link =
      process.env.NODE_ENV === 'development'
        ? `https://dev.pesquisasricas.com/quiz/${password}`
        : `https://pesquisasricas.com/quiz/${password}`;

    const mailOptions = {
      from: 'quiz@pesquisasricas.com',
      to: fields.email,
      subject: `Convite para avaliação 360°`,
      template: 'participant',
      context: {
        name: `${fields.name}`,
        email: fields.email,
        link
      }
    };

    await Mail.sendMail(mailOptions);
  }
};
