/**
 * EXCEPTION TO BE THROWN IF AN ITEM CANONOT
 * BE FOUND.
 */
export class NotFoundError extends Error {
  constructor(...props) {
    super(...props);
    this.status = 404;
    this.name = 'NotFoundError';
  }
}

/**
 * EXCEPTION FOR MALFORMED REQUEST
 */
export class BadRequestError extends Error {
  constructor(...props) {
    super(...props);
    this.status = 400;
    this.name = 'BadRequestError';
  }
}
