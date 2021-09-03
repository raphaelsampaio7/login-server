import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(data: User): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByCellPhone(cell_phone: string): Promise<User | undefined>;
}
