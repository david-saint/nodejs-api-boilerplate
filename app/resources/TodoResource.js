import Resource from './__init__/Resource';

class TodoResource extends Resource {
  /**
   * Define the format of all todos
   * @param  {Request} request
   * @return {mixed}
   */
  make(request) {
    return {
      id: this.resource.id,
      title: this.resource.title,
      is_new: this.when(false, false),
      updated_at: this.resource.updatedAt,
      created_at: this.resource.createdAt,
    };
  }
}

export default TodoResource;
