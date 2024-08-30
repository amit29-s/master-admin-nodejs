import jwt from 'jsonwebtoken';
import { env } from 'src/env';

const secret = env.app.auth.jwtsecret;

export function generateToken(payload: any): string {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
}
