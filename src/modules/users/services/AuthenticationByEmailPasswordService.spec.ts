import 'reflect-metadata';
import AppError from '../../../shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import AuthenticationByEmailPasswordService from './AuthenticationByEmailPasswordService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticationByEmailPasswordService: AuthenticationByEmailPasswordService;

describe('FindUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    authenticationByEmailPasswordService =
      new AuthenticationByEmailPasswordService(
        fakeUserRepository,
        fakeHashProvider,
      );
  });

  it('should be able to authenticate by email and password.', async () => {
    await createUserService.execute({
      name: 'João da Silva',
      email: 'myemail@email.com',
      cell_phone: '55555555555',
      password: '123456',
    });

    const response = await authenticationByEmailPasswordService.execute({
      email: 'myemail@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with wrong email.', async () => {
    await createUserService.execute({
      name: 'João da Silva',
      email: 'myemail@email.com',
      cell_phone: '55555555555',
      password: '123456',
    });

    await expect(
      authenticationByEmailPasswordService.execute({
        email: 'myemail2@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password.', async () => {
    await createUserService.execute({
      name: 'João da Silva',
      email: 'myemail@email.com',
      cell_phone: '55555555555',
      password: '123456',
    });

    await expect(
      authenticationByEmailPasswordService.execute({
        email: 'myemail@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with non existing user.', async () => {
    await expect(
      authenticationByEmailPasswordService.execute({
        email: 'myemail2@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
