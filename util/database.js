//stablish connection to the db 
const { Sequelize } = require('@sequelize/core')

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

module.exports = sequelize