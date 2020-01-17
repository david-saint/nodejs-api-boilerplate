import Model from './__init__/Model';

export default class TodoItem extends Model {
  /**
   * Initialize the model with typed fields, and add configurations
   *
   * @param  {Object} sequelize
   * @param  {Object} DataTypes
   * @return {Obect}
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        complete: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        paranoid: true,
        timestamps: true,
        underscored: true,
        modelName: 'todo_item',
        tableName: 'todo_items',
      },
    );
  }

  /**
   * Define the model relations
   *
   * @param  {Object} models
   * @return {void}
   */
  static associate(models) {
    // the todo item belongs to a todo
    this.todo = this.belongsTo(models.Todo, { onDelete: 'CASCADE' });
  }
}
