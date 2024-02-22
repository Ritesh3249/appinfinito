const Sequelize = require("sequelize");
const sequelize = require("../../startup/db");

const Organization = sequelize.define("Organization", {

  nano_id: {
    type: Sequelize.STRING(16),
    allowNull: true,
    unique: true,
  },
  org_id: {
    type: Sequelize.STRING(),
    allowNull: true,
    unique: true,
  },
  pan_id: { 
    type: Sequelize.STRING(50),
    allowNull: true,
    unique: true,
  },
  email_id: {
    type: Sequelize.STRING(255),
    allowNull: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(),
    default:"",
    allowNull: true,
  },
  mobile: {
    type: Sequelize.STRING(50),
    allowNull: true,
    unique: true,
  },
  state: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  address_line_1: {
    type: Sequelize.STRING(255),
  },
  address_line_2: {
    type: Sequelize.STRING(255),
  },
  legal_name: {
    type: Sequelize.STRING(255),
    unique: true,
    set(value) {
      this.setDataValue('legal_name', value.toLowerCase());
    },
  },
  gstin: {
    type: Sequelize.STRING(255),
    unique: true
  },
  website_url: {
    type: Sequelize.STRING(255),
    unique: true
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true, 
  },
  // created_date: {
  //   type: Sequelize.DATE,
  //   allowNull: true,
  // },
  // created_by: {
  //   type: Sequelize.STRING,  
  // },
  // updated_at: {
  //   type: Sequelize.DATE,
  // },
  // updated_by: {
  //   type: Sequelize.STRING,  
  // },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    
},
});

module.exports = Organization;
