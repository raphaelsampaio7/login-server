import { injectable, inject } from 'tsyringe';

import IUserRepository from '../repositories/IUserRepository';
import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';

interface Request {
  name: string;
  email: string;
  cell_phone: string;
  password: string;
}

interface Response {
  id: string;
  name: string;
  email: string;
  cell_phone: string;
  created_at: Date;
  updated_at: Date;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    cell_phone,
    password,
  }: Request): Promise<Response> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('E-mail already registered', 400);
    }

    const phoneExists = await this.usersRepository.findByCellPhone(cell_phone);

    if (phoneExists) {
      throw new AppError('Celular já cadastrado.', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const { id, created_at, updated_at } = await this.usersRepository.create({
      name,
      cell_phone,
      email,
      password_hash: hashedPassword,
    });

    return {
      id,
      name,
      email,
      cell_phone,
      created_at,
      updated_at,
    };
  }
}

export default CreateUserService;
