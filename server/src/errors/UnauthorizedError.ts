import CustomError from './CustomError';

export default class UnauthorizedError extends CustomError {
  readonly statusCode = 401;
  readonly sendToClient: Record<any, any>;

  constructor(message: string) {
    super(message);
    this.sendToClient = { message };
  }
}
