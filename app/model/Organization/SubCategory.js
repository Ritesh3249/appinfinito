const Sequelize = require('sequelize');
const sequelize = require('../../startup/db');

const SubCategory = sequelize.define('SubCategory', {
  sub_category_name: {
    type: Sequelize.STRING(255),
    allowNull: true,
    set(value) {
      this.setDataValue('sub_category_name', value.toLowerCase());
    },
  },
  
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
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

  isDeleted:{
    type: Sequelize.BOOLEAN,
    
    defaultValue: false,  
  }, 
});

module.exports = SubCategory;
