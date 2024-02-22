const Sequelize = require('sequelize');
const sequelize = require('../../startup/db');  
const Category = sequelize.define('Category', {
  category_name: {
    type: Sequelize.STRING,
    allowNull: true,
    set(value) {
      this.setDataValue('category_name', value.toLowerCase());
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
  isDeleted:{
    type: Sequelize.BOOLEAN,
    defaultValue: false,  
  },    
  org_id: {
    type:  Sequelize.STRING(255),
    defaultValue: "",  
  },
  isMenu:{
    type: Sequelize.BOOLEAN,
    defaultValue: false,  
  },
  isHome:{
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

module.exports = Category;
