import { OauthPlatformType } from '../models/OauthUser.model';
import UnauthorizedError from './UnauthorizedError';

export default class OauthUsernameError extends UnauthorizedError {
  readonly sendToClient: Record<any, any>;

  constructor(platform: OauthPlatformType) {
    const message = 'Username required!';
    super(message);
    this.sendToClient = { platform, message };
  }
}
