import JOI from 'joi';

/**
 * Validation rules for creating a new todo item
 *
 * @return {schema} A JOI schema is returned
 */
function create() {
  const schema = JOI.object({
    body: JOI.object({
      complete: JOI.boolean(),
      content: JOI.string().max(255).required(),
    }),
    params: JOI.object({
      todoId: JOI.number().required(),
    }),
  });

  return schema;
}

/**
 * Validation rules for updating a todo item
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
