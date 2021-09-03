import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';

class ForgotPasswordController {
  async store(request: Request, response: Response) {
    try {
      const { email } = request.body;

      const sendForgotPasswordEmail = container.resolve(
        SendForgotPasswordEmailService,
      );

      await sendForgotPasswordEmail.execute({
        email,
      });

      return response.status(204).json();
    } catch (error) {
      return response
        .status(error.statusCode || 500)
        .json({ error: `${error.message}` });
    }
  }
}

export default new ForgotPasswordController();
