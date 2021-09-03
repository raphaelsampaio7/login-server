import { container } from 'tsyringe';

import '../../modules/users/providers';

import IUserRepository from '../../modules/users/repositories/IUserRepository';
import UserRepository from '../../modules/users/infra/typeorm/repositories/UserRepository';

import IUserTokenRepository from '../../modules/users/repositories/IUserTokenRepository';
import UserTokenRepository from '../../modules/users/infra/typeorm/repositories/UserTokenRepository';

import IMailProvider from './providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from './providers/MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandleBarsMailTemplateProvider from './providers/MailTemplateProvider/implementations/HandleBarsMailTemplateProvider';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandleBarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
