import { PlatformType } from '../types';
import UnauthorizedError from './UnauthorizedError';

export default class OauthUsernameError extends UnauthorizedError {
  readonly sendToClient: Record<any, any>;

  constructor(platform: PlatformType) {
    const message = 'Username required!';
    super(message);
    this.sendToClient = { platform, message };
  }
}
