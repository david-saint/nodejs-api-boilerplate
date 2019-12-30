import MissingValue from './MissingValue';

export default class Resource {
  /**
   * Create a new resource instance.
   *
   * @param  {mixed} resource
   * @return {void}
   */
  constructor(resource, status = 200) {
    // this is what all the resources would be wrapped in
    this.wrapper = 'data';
    // the resource instance
    this._resource = resource;
    // the status of the response
    this._status = status;
  }

  /**
   * get the resource instance.
   *
   * @return {mixed}
   */
  get resource() { return this._resource; }

  /**
   * Set the request instance.
   *
   * @param  {Request} request
   * @return {void}
   */
  set request(request) { this._request = request; }

  /**
   * Retrieve a value based on a given condition
   *
   * @param  {Boolean} condition
   * @param  {mixed} value
   * @param  {miixed} $default
   * @return {MissingValue|mixed}
   */
  when(condition, value, $default = null) {
    // if the condition is met return the value
    if (condition && typeof value !== 'function') return value;
    // if the condition is met return the value of the value
    if (condition && typeof value === 'function') return value();
    // otherwise, return default or missing value accordingly
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
  whenLoaded(relationship, value = null, $default = null) {
    let reflex = $default;

    // if there's no default value, let reflex be missing value
    if (arguments.length < 3) { reflex = new MissingValue(); }
    // if the relation is not loaded return default
    if (typeof this.resource[relationship] === 'undefined') return reflex;
    // if the relation is loaded and there's value to return return the loaded relation.
    if (arguments.length === 1) return this.resource[relationship];
    // if we think the relation is loaded, but it's actually null return null.
    if (this.resource[relationship] === null) return null;

    return value;
  }

  /**
   * Default make method.. incase they don't specify a make
   * method in the parent class.
   *
   * @param  {Request} request
   * @return {mixed}
   */
  make(request) { return this._resource; }

  /**
   * Default response status, overiide this method
   * to be able to change the status of response.
   * @return {[type]} [description]
   */
  responseStatus() { return this._status; }

  /**
   * Resolve the resource to useable object format.
   *
   * @param  {Request} request
   * @return {Object}
   */
  resolve(request = null) {
    let data = this.make(request || this._request);
    // if the data from the make is a function call it.
    if (typeof data === 'function') { data = data(); }

    return Resource.removeMissingValues(data);
  }

  /**
   * Create the HTTP response that represents the object.
   * @param  {Request} request
   * @return {Object}
   */
  toResponse(request) {
    return {
      status: this.responseStatus(),
      [this.wrapper]: this.resolve(request),
    };
  }

  /**
   * create a new resource collection.
   *
   * @param  {mixed} resource
   * @param  {Number} status
   * @return {AnonymousResourceCollection}
   */
  static collection(resource, status = 200) {
    return new ResourceCollection(resource, status, this.name); // eslint-disable-line
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
          || (value instanceof Resource
            && value.resource instanceof MissingValue
            && value.resource.isMissing())) {
        delete data[key];
      }
    }

    return data;
  }
}


export class ResourceCollection extends Resource {
  /**
   * Create a new resource instance.
   * @param  {mixed} resource
   * @param  {int} status
   * @param  {string} collects
   * @return {void}
   */
  constructor(resource, status, collects) {
    super(resource, status);

    this.Collects = require(`../${collects}`).default; // eslint-disable-line
    console.log(this.Collects);
    this._resource = this.collectResource(resource);
  }

  /**
   * map the given array of resources to its individual
   * resources..,
   * @param  {array|MissingValue} resource
   * @return {array|MissingValue}
   */
  collectResource(resource) {
    if (resource instanceof MissingValue) return resource;
    return this.Collects && !(resource[0] instanceof this.Collects)
      ? resource.map(r => new this.Collects(r))
      : resource;
  }

  /**
   * Transofrm the resource into a JSON array
   * @param  {Request} request
   * @return {array}
   */
  make(request) {
    return this._resource.map(r => r.make(request));
  }

  /**
   * Create an HTTP response that represents the object
   * @param  {Request} request
   * @return {object}
   */
  toResponse(request) {
    // TODO: implement pagination.
    return super.toResponse(request);
  }
}
