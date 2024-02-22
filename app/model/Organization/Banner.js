const Sequelize = require('sequelize');
const sequelize = require('../../startup/db');  
const Banner = sequelize.define('Banner', {
  

  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,  
  },
  image_url: {
    type:  Sequelize.ARRAY(Sequelize.STRING),
    defaultValue:[],
    allowNull: true, 
  },
  org_id: {
    type:  Sequelize.STRING(255),
    defaultValue: "",  
  },
  type: {
    type: Sequelize.STRING,
    defaultValue:"",
    allowNull: true, 
    set(value) {
      this.setDataValue('type', value.toLowerCase());
    },
  },
  type_id:{
    type:  Sequelize.STRING(255),
    defaultValue: "",  
  },
  type_name:{
    type:  Sequelize.STRING(255),
    defaultValue: "",  
    set(value) {
      this.setDataValue('type_name', value.toLowerCase());
    },
  },
  isDeleted:{
    type: Sequelize.BOOLEAN,
    defaultValue: false,  
  }
  // ,
  // isProduct:{
  //   type: Sequelize.BOOLEAN,
  //   defaultValue: false,  
  // }
  // created_by: {
  //   type: Sequelize.INTEGER,  
  //   allowNull: true,
  // },
});

module.exports = Banner;
