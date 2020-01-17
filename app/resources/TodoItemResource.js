import Resource from './__init__/Resource';

class TodoItemResource extends Resource {
  /**
   * Define the format of all todos
   * @param  {Request} request
   * @return {mixed}
   */
  make(request) {
    return {
      id: this.resource.id,
      content: this.resource.content,
      complete: this.resource.complete,
      updated_at: this.resource.updatedAt,
      created_at: this.resource.createdAt,
    };
  }
}

export default TodoItemResource;
