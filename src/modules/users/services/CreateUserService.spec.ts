import 'reflect-metadata';
import AppError from '../../../shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user.', async () => {
    const user = await createUserService.execute({
      name: 'João da Silva',
      email: 'myemail@email.com',
      cell_phone: '55555555555',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not create a user with a duplicate email address.', async () => {
    await createUserService.execute({
      name: 'João da Silva',
      email: 'myemailaddress@email.com',
      cell_phone: '55555555555',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'João da Silva',
        email: 'myemailaddress@email.com',
        cell_phone: '75555555555',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create a user with an duplicate cell phone.', async () => {
    await createUserService.execute({
      name: 'João da Silva',
      email: 'myemail@email.com',
      cell_phone: '55555555555',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'João da Silva',
        email: 'myemail2@email.com',
        cell_phone: '55555555555',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
