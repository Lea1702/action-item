const { User, Workout } = require('../src/model');

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // create tables
  await User.sync({ force: true });
  await Workout.sync({ force: true });
  //insert data
  await Promise.all([
    User.create({
      name: 'John',
      password: 'Wizard',
      age: 22,
      city: 'Paris'
    }),
    User.create({
      name: 'Ella',
      password: 'Bla',
      age: 42,
      city: 'Tel Aviv'
    })
  ]);
}