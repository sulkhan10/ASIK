"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Disease);
      User.hasOne(models.Contact);
    }
    static timeNow(local) {
      const time = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      let result = time.toLocaleDateString(local, options);
      return result;
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Username name can't be null",
          },
          notEmpty: {
            msg: "Username name can't be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email name can't be null",
          },
          notEmpty: {
            msg: "Email name can't be empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password name can't be null",
          },
          notEmpty: {
            msg: "Password name can't be empty",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Role name can't be null",
          },
          notEmpty: {
            msg: "Role name can't be empty",
          },
        },
      },
      DiseaseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Disease ID name can't be null",
          },
          notEmpty: {
            msg: "Disease ID name can't be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user, options) => {
    let salt = bcrypt.genSaltSync(6);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  });
  return User;
};
