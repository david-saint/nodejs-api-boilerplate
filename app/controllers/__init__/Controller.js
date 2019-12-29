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
   * @return {[type]}              [description]
   */
  validate(request, validator = null) {
    if (validator === null) return true;

    const { value, error } = validator.validate(request);
    if (error) { error.status = 400; throw error; }

    return value;
  }
}
