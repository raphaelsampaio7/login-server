import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '../../../services/ResetPasswordService';

class ResetPasswordController {
  async store(request: Request, response: Response) {
    try {
      const { password, token } = request.body;

      const resetPassword = container.resolve(ResetPasswordService);

      await resetPassword.execute({
        token,
        password,
      });

      return response.status(204).json();
    } catch (error) {
      return response
        .status(error.statusCode || 500)
        .json({ error: `${error.message}` });
    }
  }
}

export default new ResetPasswordController();
