import CustomError from './CustomError';

export default class NotFoundError extends CustomError {
  readonly statusCode = 404;
  readonly sendToClient: Record<any, any>;

  constructor(message: string) {
    super(message);
    this.sendToClient = { message };
  }
}
