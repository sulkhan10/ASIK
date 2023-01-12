"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Disease.hasMany(models.User),
        Disease.belongsToMany(models.Symptom, {
          through: models.DiseaseSymptom,
        });
    }
  }
  Disease.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name can't be null",
          },
          notEmpty: {
            msg: "Name can't be empty",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description can't be null",
          },
          notEmpty: {
            msg: "Description can't be empty",
          },
          
        },
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Level can't be null",
          },
          notEmpty: {
            msg: "Level can't be empty",
          },
          customSymptom() {
            if (this.name.length <= [0] ) {
              throw new Error(
                "Level minimum is 1"
              );
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Disease",
    }
  );
  return Disease;
};
