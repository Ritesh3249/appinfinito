const Sequelize = require("sequelize");
const sequelize = require("../../startup/db");

const SuperAdmin = sequelize.define("SuperAdmin", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
    
    firstName: {
        type: Sequelize.STRING(80),
        defaultValue: "",
        allowNull: true,
    },
  
    lastName: {
        type: Sequelize.STRING(80),
        defaultValue: "",
        allowNull: true,
    },
    email_id: {
        type: Sequelize.STRING(100),
        defaultValue: "",
        // unique: true,
        allowNull: true,
    },
    password: {
        type: Sequelize.STRING,
        defaultValue: "",
        allowNull: true
    },
    role:{
      type: Sequelize.STRING(100),
      defaultValue: "superAdmin",
      // unique: true,
      allowNull: true,
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    },
});
 
 //Admin.sync({force:false})
module.exports = SuperAdmin;
