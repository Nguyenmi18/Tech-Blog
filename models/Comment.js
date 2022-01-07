const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

// create our User model
class Comment extends Model {}

// create fields/columns for User model
Comment.init(
  {
	body: {
		type:DataTypes.STRING,
		allowNull: false
	}
  },
  {
    sequelize,
  }
);

module.exports = Comment;
