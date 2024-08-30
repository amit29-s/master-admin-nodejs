import { Request } from 'express';

export interface IUserAuthInfoRequest extends Request {
  user: string; // or any other type
}
