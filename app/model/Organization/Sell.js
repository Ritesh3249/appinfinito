const Sequelize = require('sequelize');
const sequelize = require('../../startup/db');

const Sell = sequelize.define('Sell', {
  item_name: {
    type: Sequelize.STRING(255),
    allowNull: true,
    set(value) {
      this.setDataValue('item_name', value.toLowerCase());
    },
  },
  quantity: {
    type:  Sequelize.STRING(255),
    defaultValue: "",  
  },
  sell_type: {
    type:  Sequelize.STRING(255),
    defaultValue: "sell",  
  },
  sell_price: {
    type:  Sequelize.STRING(255),
    defaultValue: "0.00",  
  },
  return_reason:{
    type:  Sequelize.STRING(255),
    defaultValue: "",  
  },
  return_quantity:{
    type:  Sequelize.STRING(255),
    defaultValue: "0",  
  },
  org_id: {
    type:  Sequelize.STRING(255),
    defaultValue: "",  
  },
  comment:{
    type: Sequelize.STRING(255),
    allowNull: true,
   
  },
  isDeleted:{
    type: Sequelize.BOOLEAN,
    
    defaultValue: false,  
  }, 
});

module.exports = Sell;
