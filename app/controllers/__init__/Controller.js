import JOI from 'joi';

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
  async validate({ body }, validator = null) {
    if (validator === null) return true;

    const { value, error } = await JOI.validate(body, validator);
    if (error) throw new Error(error);

    return value;
  }
}
