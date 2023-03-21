
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Post extends Model {}

Post.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING,

    id: {
      type : DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'post'
  }
);

module.exports = Post;

