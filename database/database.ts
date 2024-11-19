const { Sequelize } = require('sequelize');
require('dotenv').config();

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
    port: 5432,
    pool: {max: 20, min: 0},
    logging: false
})

export default async function ConnectDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
