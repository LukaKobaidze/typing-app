import CustomError from './CustomError';

export default class ValidationError extends CustomError {
  readonly statusCode = 400;
  readonly sendToClient: Record<any, any>;

  constructor(message: string, field: string) {
    super(message);
    this.sendToClient = { message, field };
  }
}
