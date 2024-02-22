const Sequelize = require('sequelize');
const sequelize = require('../../startup/db');

const Staff = sequelize.define('Staff', {
  staff_name: {
    type: Sequelize.STRING(255),
    allowNull: true,
    set(value) {
      this.setDataValue('staff_name', value.toLowerCase());
    },
  },

  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  image_url: {
    type:  Sequelize.ARRAY(Sequelize.STRING),
    defaultValue:[],
    allowNull: true, 
  },
  // created_date: {
  //   type: Sequelize.DATE,
  //   allowNull: true,
  // },
//   created_by: {
//     type: Sequelize.INTEGER,
//   }, 
  org_id: {
    type:  Sequelize.STRING(255),
    defaultValue: "",  
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
  isDeleted:{
    type: Sequelize.BOOLEAN,
    
    defaultValue: false,  
  }, 
});

module.exports = Staff;
