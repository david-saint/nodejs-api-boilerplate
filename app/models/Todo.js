import { Model } from 'sequelize';

export default class Todo extends Model {
  /**
   * Initiialize the model with typed fields, and add configurations.
   *
   * @param  {Object} sequelize
   * @param  {Object} DataTypes
   * @return {Object}
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        paranoid: true,
        timestamps: true,
        modelName: 'todo',
        underscored: true,
        tableName: 'todos',
      },
    );
  }

  /**
   * Define Model relatioinships.
   *
   * @param  {Object} models
   * @return {void}
   */
  static associate(models) {
    // the todo has many to items.
    this.todoItems = this.hasMany(models.TodoItem);
  }
}
