import models from '../models';
import Controller from './__init__/Controller';
import TodoResource from '../resources/TodoResource';
import { create as createTodoValidator } from './validators/Todo';

class TodoController extends Controller {
  /**
   * The method that handles the creation of a new todo list
   * @param  {Request} req
   * @param  {Response} res
   * @return {JSON}
   */
  async create(req, res) {
    // validate the request
    this.validate(req, createTodoValidator());
    // then create a new todo
    const todo = await models.Todo.create({ title: req.body.title });
    // return the resource, with a status of 201
    return new TodoResource(todo, 201);
  }

  /**
   * The method that handles listing out all the todos
   * @param  {Request} req
   * @param  {Response} res
   * @return {JSON}
   */
  async index(req, res) {
    // get all the todos
    const todos = await models.Todo.findAll();
    // return a collection of todos.
    return TodoResource.collection(todos);
  }
}

export default TodoController;
