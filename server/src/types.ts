import { Request } from 'express';

export type PlatformType = 'GitHub' | 'Google';

export interface AuthenticatedRequest<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = qs.ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  user?: {
    username: string;
    platform?: PlatformType;
  };
}
