const Sequelize = require('sequelize');
const sequelize = require('../../startup/db');

const Purchase = sequelize.define('Purchase', {
  item_name: {
    type: Sequelize.STRING(255),
    allowNull: true,
    set(value) {
      this.setDataValue('item_name', value.toLowerCase());
    },
  },
   
  quantity: {
    type:  Sequelize.STRING(255),
    defaultValue: "0",  
  },
  vendor_name: {
    type:  Sequelize.STRING(255),
    defaultValue: "", 
    set(value) {
      this.setDataValue('vendor_name', value.toLowerCase());
    }, 
  },
  mrp: {
    type:  Sequelize.STRING(255),
    defaultValue: "0.00",  
  },
  // sell_price: {
  //   type:  Sequelize.STRING(255),
  //   defaultValue: "0.00",  
  // },
  buyer_price: {
    type:  Sequelize.STRING(255),
    defaultValue: "0.00",  
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

module.exports = Purchase;
