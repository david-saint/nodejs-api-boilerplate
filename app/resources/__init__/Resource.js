import MissingValue from './MissingValue';

export default class Resource {
  /**
   * Retrieve a value based on a given condition
   *
   * @param  {Boolean} condition
   * @param  {mixed} value
   * @param  {miixed} $default
   * @return {MissingValue|mixed}
   */
  when(condition, value, $default = null) {
    if (condition) {
      return value;
    }

    return arguments.length === 3 ? $default : new MissingValue();
  }

  /**
   * Retrieve a relationship if it has been loaded.
   *
   * @param  {String} relationship
   * @param  {mixed} value
   * @param  {mixed} reflex         The default value.
   * @return {MissingValue|Mixed}
   */
  whenLoaded(relationship, value = null, reflex = null) {
    let $default = reflex;

    if (arguments.length < 3) {
      $default = new MissingValue();
    }

    if (typeof this.resource[relationship] === 'undefined') {
      return $default;
    }

    if (arguments.length === 1) {
      return this.resource[relationship];
    }

    if (this.resource[relationship] === null) {
      return null;
    }

    return value;
  }

  /**
   * Remove the missing values from the filtered data.
   *
   * @param  {Object} data
   * @return {Obejct}
   */
  static removeMissingValues(data) {
    /* eslint-disable no-restricted-syntax */
    for (const [key, value] of Object.entries(data)) {
      /* eslint-enable no-restricted-syntax */
      if ((value instanceof MissingValue && value.isMissing())
          || (value instanceof self
            && value.resource instanceof MissingValue
            && value.resource.isMissing())) {
        delete data[key];
      }
    }

    return data;
  }
}
