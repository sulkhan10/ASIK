'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contact.belongsTo(models.User)
    }
    fullName(){
      return `${this.firstName} ${this.lastName}`
    }
  }
  Contact.init({
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "phone number can't be null"
        },
        notEmpty : {
            msg: "phone number can't be empty"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "address can't be null"
        },
        notEmpty : {
            msg: "address can't be empty"
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "first name can't be null"
        },
        notEmpty : {
            msg: "first name can't be empty"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "last name can't be null"
        },
        notEmpty : {
            msg: "last name can't be empty"
        }
      }
    },
    UserId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};