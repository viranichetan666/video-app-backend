const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    static associate(models) {
        // define association here
    }
  };
  Movies.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false 
    },
    title: {
       type: DataTypes.STRING,
        allowNull: false,
        
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    poster: {
        type: DataTypes.STRING,
        allowNull: true
    },
    trailer: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, {
    sequelize,
    modelName: 'movies',
  });
  return Movies;
};