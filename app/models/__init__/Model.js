import { Model } from 'sequelize';
import Paginator from './Paginator';
import { NotFoundError } from '../../exceptions';

export default class AbstractModel extends Model {
  /**
   * Find a model by primary key
   * @param  {[type]} primaryKey [description]
   * @param  {[type]} options    [description]
   * @return {[type]}            [description]
   */
  static async find(primaryKey, options) {
    // find the model
    const model = await this.findByPk(primaryKey, options);
    // if there's no model throw an error
    if (model === null) {
      throw new NotFoundError(`Could not find a ${this.name} with id [${primaryKey}]`);
    }
    // return the found model
    return model;
  }

  /**
   * Method for paginating a group of results..
   * @param  {[type]} request [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  static async paginate(request, options = {}) {
    // get the current page
    const page = Paginator.resolveCurrentPage(request);
    // get the number of results to display per page
    const perPage = parseInt(request.query.per_page, 10) || this.getPerPage();
    // if the perpage is not a number just return.
    if (isNaN(perPage) || perPage < 1) return this.findAll(options);
    // query the database and retrieve the count and results
    const { count, rows } = await this.findAndCountAll({
      ...options, limit: perPage, offset: perPage * (page - 1),
    });
    // get the path and query from the request
    const { path, query } = request;
    // return a new paginator instance
    return new Paginator(rows, count, perPage, page, { path, query });
  }

  /**
   * get the number of results to display
   * per page. This method can be overriden to
   * change the per_page specific to models.
   *
   * @return {Number} [description]
   */
  static getPerPage() { return process.env.PAGINATION_PER_PAGE || 25; }
}
