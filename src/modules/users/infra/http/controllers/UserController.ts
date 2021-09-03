import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';

import AppError from '../../../../../shared/errors/AppError';
import CreateUserService from '../../../services/CreateUserService';

class UserController {
  async store(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, cell_phone, password } = request.body;

      const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        cell_phone: yup.string().required(),
        password: yup.string().min(6).required(),
      });

      if (
        !(await schema.isValid({
          name,
          email,
          cell_phone,
          password,
        }))
      ) {
        throw new AppError('Validations fails', 401);
      }

      const createUserService = container.resolve(CreateUserService);

      const { id, created_at, updated_at } = await createUserService.execute({
        name,
        email,
        cell_phone,
        password,
      });

      return response.json({
        id,
        name,
        email,
        cell_phone,
        created_at,
        updated_at,
      });
    } catch (error) {
      return response
        .status(error.statusCode || 500)
        .json({ error: `${error.message}` });
    }
  }
}

export default new UserController();
