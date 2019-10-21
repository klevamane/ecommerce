/**
 * Validation Error
 */
export default class CustomValidationError extends Error {
  // eslint-disable-next-line require-jsdoc
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'ValidationError';
  }
}
