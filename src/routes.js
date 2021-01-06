import { Router } from 'express';
import UsersController from './app/controllers/UsersController';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json({ pagina: 'server started, baby!' });
});

routes.get('/users/:id', UsersController.show);
routes.get('/users', UsersController.index);
routes.post('/users', UsersController.store);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);

export default routes;
