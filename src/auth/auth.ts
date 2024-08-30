// src/middleware/auth.ts

import { Response, NextFunction } from 'express';
import { verifyToken } from './jwt';
import { IUserAuthInfoRequest } from 'src/types/express.type';

/*
    Use this as middleware on any routing

    e.g @UseBefore(authMiddleware)
*/

export function authMiddleware(
  req: IUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Failed to authenticate token' });
  }

  // Attach user info to request object
  req.user = decoded;
  return next();
}
