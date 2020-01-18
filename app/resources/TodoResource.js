import Resource from './__init__/Resource';
import TodoItemResource from './TodoItemResource';

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
      updated_at: this.resource.updatedAt,
      created_at: this.resource.createdAt,
      todo_items_count: this.whenLoaded(
        'todo_items',
        () => this.resource.todo_items.length,
      ),
      // todo_items: this.whenLoaded(
      //   'todo_items',
      //   () => TodoItemResource.collection(this.resource.todo_items),
      // ),
    };
  }
}

export default TodoResource;
