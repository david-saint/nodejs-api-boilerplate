import JOI from 'joi';

export default class Controller {
  constructor() {
    if (this.constructor === Controller) {
      throw new TypeError('Abstract class "Widget" cannot be instantiated directly.');
    }
  }

  async validate({ body }, validator = null) {
    if (validator === null) return true;
    const { value, error } = await JOI.validate(body, validator);
    if (error) throw new Error(error);
    return value;
  }
}
