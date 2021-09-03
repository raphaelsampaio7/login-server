import { getRepository, Repository } from 'typeorm';

import User from '../entities/User';
import IUserRepository from '../../../repositories/IUserRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    cell_phone,
    password_hash,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      cell_phone,
      password_hash,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(data: User): Promise<User> {
    const user = await this.ormRepository.save(data);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findByCellPhone(cell_phone: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { cell_phone },
    });

    return user;
  }
}

export default UserRepository;
