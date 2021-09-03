import { v4 } from 'uuid';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';
import IUserRepository from '../IUserRepository';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findByCellPhone(cell_phone: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.cell_phone === cell_phone);

    return findUser;
  }

  public async create({
    name,
    email,
    cell_phone,
    password_hash,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4(), name, email, cell_phone, password_hash });

    this.users.push(user);

    return user;
  }

  public async save(data: User): Promise<User> {
    const index = this.users.findIndex(user => user.id === data.id);
    this.users.splice(index, 1);

    return data;
  }
}

export default FakeUserRepository;
