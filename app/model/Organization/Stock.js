const Sequelize = require('sequelize');
const sequelize = require('../../startup/db');

const Stock = sequelize.define('Stock', {
  item_name: {
    type: Sequelize.STRING(255),
    allowNull: true,
    set(value) {
      this.setDataValue('item_name', value.toLowerCase());
    },
  },
  image_url: {
    type:  Sequelize.ARRAY(Sequelize.STRING),
    defaultValue:[],
    allowNull: true, 
  },
  quantity: {
    type:  Sequelize.STRING(255),
    defaultValue: "0",  
  },
  // price: {
  //   type:  Sequelize.STRING(255),
  //   defaultValue: "0",  
  // },
  org_id: {
    type:  Sequelize.STRING(255),
    defaultValue: "",  
  },
  specification:{
    type: Sequelize.JSON,
    allowNull: true,
    defaultValue:[]
  },
  description:{
    type: Sequelize.STRING(255),
    defaultValue:"",
    allowNull: true,
   
  },
  sku:{
    type: Sequelize.STRING(255),
    defaultValue:"",
    allowNull: true,
  },
  hns_code:{
    type: Sequelize.STRING(255),
    defaultValue:"",
    allowNull: true,
  },
  product_code:{
    type: Sequelize.STRING(255),
    defaultValue:"",
    allowNull: true,
  },
  isDeleted:{
    type: Sequelize.BOOLEAN,
    
    defaultValue: false,  
  }, 
});

module.exports = Stock;
