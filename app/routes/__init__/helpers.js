// determine if an object has a property
export const has = Object.prototype.hasOwnProperty;

// Method for binding a controller method to the route
export function resolve(Controller, method) {
  const instance = new Controller();

  if (!instance[method]) {
    return (req, res, next) => Promise.resolve().then(() => {
      throw new ReferenceError(
        `Call to undefined [Method] - '${method}' on [Controller] - '${Controller.name}'`,
      );
    }).catch(next);
  }

  return instance[method].bind(instance);
}
