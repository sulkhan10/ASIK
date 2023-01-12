'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Symptom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Symptom.belongsToMany(models.Disease, { through: models.DiseaseSymptom });

    }
  }
  Symptom.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "symptom can't be null"
        },
        notEmpty : {
            msg: "symptom can't be empty"
        },
        costumSympton() {
          if (this.name.length > 30) {
            throw new Error("Symptom name must be consist maximum by 30 characters")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Symptom',
  });
  return Symptom;
};