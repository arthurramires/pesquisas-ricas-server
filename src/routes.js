import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionControler from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import TemplateController from './app/controllers/TemplateController';
import QuizController from './app/controllers/QuizController';
import ParticipantController from './app/controllers/ParticipantController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionControler.store);

routes.get('/', (req, res) => {
    var ip = req.connection.remoteAddress;
    res.json({ ip });
});

routes.get('/quizzes/:password/participant', QuizController.participant);
routes.post('/quizzes/:id/answers', QuizController.answers);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/templates', TemplateController.store);

routes.get('/quizzes', QuizController.index);
routes.post('/quizzes', QuizController.store);
routes.put('/quizzes/:id', QuizController.update);
routes.get('/quizzes/:id/participants', QuizController.participants);
routes.post('/quizzes/:id/participants', QuizController.setParticipants);
routes.post('/quizzes/:id/email', QuizController.sendMail);

routes.post('/participants/:id', ParticipantController.sendMail);
routes.put('/participants/:id', ParticipantController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
