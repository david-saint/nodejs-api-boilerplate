// determine if an object has a property
export const has = Object.prototype.hasOwnProperty;

// Method for binding a controller method to the route
export function resolve(Controller, method) {
  const instance = new Controller();

  return instance[method].bind(instance);
}
