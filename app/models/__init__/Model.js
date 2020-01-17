import { Model } from 'sequelize';
import { NotFoundError } from '../../exceptions';

export default class AbstractModel extends Model {
  /**
   * Find a model by primary key
   * @param  {[type]} primaryKey [description]
   * @param  {[type]} options    [description]
   * @return {[type]}            [description]
   */
  static async find(primaryKey, options) {
    // find the channel
    const channel = await this.findByPk(primaryKey, options);
    // if there's no channel throw an error
    if (channel === null) {
      throw new NotFoundError(`Could not find a ${this.name} with id [${primaryKey}]`);
    }
    // return the found channel
    return channel;
  }
}
