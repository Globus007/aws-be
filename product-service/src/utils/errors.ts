export class NotFoundError extends Error {
  constructor(message = 'Object not found') {
    super(message);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
