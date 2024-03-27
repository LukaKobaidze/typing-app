export default abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract sendToClient: Record<any, any>;

  constructor(message: string) {
    super(message);
  }
}
