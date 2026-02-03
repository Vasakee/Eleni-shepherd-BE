import { UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export async function AuthorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const openRoutes = [
    '/',
    '/health',
    '/auth/create-email',
    '/auth/verify-email',
    '/auth/login',
    '/tickets',
    '/bank-codes',
    '/bank-codes/code',
    '/auth/confirm-user-email',
    '/webhook/paystack',
    // '/auth/confirm-user-token',
    /^\/tickets\/[0-9a-fA-F]{24}$/,
    /^\/bank-codes\/[A-Za-z0-9]+$/,
  ];

  const isOpenRoute = openRoutes.some((route) =>
    typeof route === 'string' ? route === req.path : route.test(req.path),
  );

  if (isOpenRoute) return next();

  const AuthHeader = req.header('Authorization');
  if (!AuthHeader) {
    return next(new UnauthorizedException('Authorization header is missing'));
  }
  next();
}
