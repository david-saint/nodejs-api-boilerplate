import models from '../models';
import Controller from './__init__/Controller';

class TodoController extends Controller {
  /**
   * The method that handles the creation of a new todo list
   * @param  {Request} req
   * @param  {Response} res
   * @return {JSON}
   */
  create(req, res) {
    // validate the request
    // then create a new todo
    return models.Todo
      .create({
        title: req.body.title,
      })
      .then(todo => res.status(201).json(todo))
      .catch(error => res.status(400).json(error));
  }

  /**
   * The method that handles listing out all the todos
   * @param  {Request} req
   * @param  {Response} res
   * @return {JSON}
   */
  index(req, res) {
    // Return a collection.
    return models.Todo
      .findAll()
      .then(todos => res.status(200).json(todos))
      .catch(error => res.status(400).json(error));
  }
}

export default TodoController;
