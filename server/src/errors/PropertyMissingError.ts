import CustomError from './CustomError';

export default class PropertyMissingError extends CustomError {
  readonly statusCode = 422;
  readonly sendToClient;

  constructor(message: string) {
    super(message);
    this.sendToClient = { message };
  }
}
