import { Router } from 'express';

import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import passwordsRouter from '../../../../modules/users/infra/http/routes/passwords.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordsRouter);

export default routes;
