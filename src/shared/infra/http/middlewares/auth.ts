import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../../../errors/AppError';
import authConfig from './authConfig';

interface ITokenPayload {
  iat: number;
  exp: number;
  id: string;
}

export default function auth(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, String(authConfig.secret));

    const { id } = decoded as ITokenPayload;

    request.user = {
      id,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token.');
  }
}
