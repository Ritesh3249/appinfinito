const Sequelize = require('sequelize');
const sequelize = require('../../startup/db');

const Services = sequelize.define('Service', {
  service_name: {
    type: Sequelize.STRING(255),
    allowNull: true,
    set(value) {
      this.setDataValue('service_name', value.toLowerCase());
    },
  },
  
  sub_category_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  restricted_state: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue:[],
    allowNull: true,
  },
  restricted_city: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue:[],
    allowNull: true,
  },
  image_url: {
    type:  Sequelize.ARRAY(Sequelize.STRING),
    defaultValue:[],
    allowNull: true, 
  },
  price:{
    type: Sequelize.STRING(255),
    allowNull: true,
    defaultValue:"0"
  },
  discounted_price:{
    type: Sequelize.STRING(255),
    allowNull: true,
    defaultValue:"0"
  },
  percentage_discounted_price:{
    type: Sequelize.STRING(255),
    allowNull: true,
    defaultValue:"0"
  },
 
  specification:{
    type: Sequelize.JSON,
    allowNull: true,
    defaultValue:[]
  },
  description:{
    type: Sequelize.STRING(255),
    allowNull: true,
   
  },
  slot_duration:{
    type: Sequelize.STRING(255),
    allowNull: true,
    defaultValue:"60"
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

  isDeleted:{
    type: Sequelize.BOOLEAN,
    
    defaultValue: false,  
  }, 
});

module.exports = Services;
