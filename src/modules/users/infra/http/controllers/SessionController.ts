import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as Yup from 'yup';

import AppError from '../../../../../shared/errors/AppError';
import AuthenticationByEmailPasswordService from '../../../services/AuthenticationByEmailPasswordService';

class SessionController {
  async store(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const schema = Yup.object().shape({
        email: Yup.string().email(),
        password: Yup.string().required(),
      });

      if (!(await schema.isValid({ email, password }))) {
        throw new AppError('Validations fails.', 401);
      }

      const service = container.resolve(AuthenticationByEmailPasswordService);

      const { id, cnpj, cell_phone, created_at, updated_at, token } =
        await service.execute({
          email,
          password,
        });

      return response.json({
        id,
        email,
        cnpj,
        cell_phone,
        created_at,
        updated_at,
        token,
      });
    } catch (error) {
      return response
        .status(error.statusCode || 500)
        .json({ error: `${error.message}` });
    }
  }
}

export default new SessionController();
