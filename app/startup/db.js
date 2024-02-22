const Sequelize = require('sequelize');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PSWD, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  timezone: 'UTC',
  // dialectOptions: {
  //   ssl: {
  //     require: true, // This will help you. But you will see nwe error
  //     rejectUnauthorized: false // This line will fix new error
  //   }
  // },
});
sequelize.authenticate().then(()=>console.log("Db connected")).catch((err)=>console.log("Db connection failed",err))
module.exports = sequelize;