import { Request } from 'express';
import { UserProperties } from './models/User.model';

export interface ResponseError extends Error {
  status?: number;
}

export interface CustomRequest<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = qs.ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  user?: UserProperties;
}

