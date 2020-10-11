const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

class User extends Sequelize.Model {}
User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User'
  }
);

class Workout extends Sequelize.Model {}
Workout.init(
  {
    user: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lat: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    lon: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    comments: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pollutionLevel: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'Workout'
  }
);


module.exports = {
  sequelize,
  User,
  Workout
};