import models from '../../models';

export default class Controller {
  constructor() {
    if (this.constructor === Controller) {
      throw new TypeError('Abstract class "Controller" cannot be instantiated directly.');
    }
  }

  /**
   * Handles data validation.
   * @param  {Object} options.body
   * @param  {mixed} validator
   * @return {Array|Object}
   */
  validate(request, validator = null) {
    if (validator === null) return null;
    // If an array of validators was passed, recursively run each of them.
    if (Array.isArray(validator)) return validator.map(v => this.validate(request, v));
    // run the validate logic on the request.
    const { value, error } = validator.validate(request);
    // if there's an error throw it to exit out of the process...
    if (error) { error.status = 400; throw error; }
    // return the value
    return value;
  }

  /**
   * Handles validation asynchronously.
   *
   * @param  {Request} request
   * @param  {mixed} validator
   * @return {Array|Object}
   */
  async validateAsync(request, validator = null) {
    // return the validation asynchronously.. I guess.
    return this.validate(request, validator);
  }

  /**
   * returns an array of models, that the api
   * consumer wants loaded with the response.
   *
   * @param  {Request} request.query
   * @return {array}
   */
  includes({ query }) {
    // get the with query from the request
    const withRelations = query.with ? query.with.split(',') : undefined;
    // filter the valid ones
    return withRelations && withRelations
      .filter(r => typeof models[r] !== 'undefined')
      .map(r => models[r]);
  }
}
