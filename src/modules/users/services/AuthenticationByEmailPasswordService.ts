import { sign } from 'jsonwebtoken';

import { injectable, inject } from 'tsyringe';

import authConfig from '../../../shared/infra/http/middlewares/authConfig';
import AppError from '../../../shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';

interface Request {
  email: string;
  password: string;
}

interface Response {
  id: string;
  name: string;
  email: string;
  cell_phone: string;
  created_at: Date;
  updated_at: Date;
  token: string;
}

@injectable()
class AuthenticationByEmailPasswordService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail / senha estão incorretos.', 401);
    }

    if (!(await this.hashProvider.compareHash(password, user.password_hash))) {
      throw new AppError('E-mail / senha estão incorretos.', 401);
    }

    const token = sign({ id: user.id }, String(authConfig.secret), {
      expiresIn: authConfig.expiresIn,
    });

    const { id, name, cell_phone, created_at, updated_at } = user;

    return {
      id,
      name,
      email,
      cell_phone,
      created_at,
      updated_at,
      token,
    };
  }
}

export default AuthenticationByEmailPasswordService;
