import JOI from 'joi';

/**
 * Validation rules for creating a new todo
 *
 * @return {schema} A JOI schema is returned
 */
function create() {
  const schema = JOI.object({
    body: JOI.object({
      title: JOI.string().max(255).required(),
    }),
  });

  return schema;
}

/**
 * Validation rules for updating a todo.
 *
 * @return {schema}
 */
function save() {
  return null;
}


export {
  save,
  create,
};
