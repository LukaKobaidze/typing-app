import CustomError from './CustomError';

export default class InternalServerError extends CustomError {
  readonly statusCode = 500;
  readonly sendToClient: Record<any, any>;

  constructor(message: string) {
    super(message);
    this.sendToClient = { message };
  }
}
