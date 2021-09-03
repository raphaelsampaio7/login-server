import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();

passwordRouter.post('/forgot', ForgotPasswordController.store);
passwordRouter.post('/reset', ResetPasswordController.store);

export default passwordRouter;
