import { Request } from 'express';
import { UserProperties } from './models/User.model';

export interface ResponseError extends Error {
  status?: number;
}

export interface CustomRequest extends Request {
  user?: UserProperties;
}
