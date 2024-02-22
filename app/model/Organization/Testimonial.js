const Sequelize = require('sequelize');
const sequelize = require('../../startup/db');

const Testimonial = sequelize.define('Testimonial', {
 

  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  image_url: {
    type:  Sequelize.ARRAY(Sequelize.STRING),
    defaultValue:[],
    allowNull: true, 
  },
  name: {
    type: Sequelize.STRING,
    defaultValue:"",
    allowNull: true,
    set(value) {
      this.setDataValue('name', value.toLowerCase());
    },
  },
  destination: {
    type: Sequelize.STRING,
    defaultValue:"",
    allowNull: true,
  },
  text: {
    type: Sequelize.STRING,
    defaultValue:"",
    allowNull: true,
  },
  org_id: {
    type:  Sequelize.STRING(255),
    defaultValue: "",  
  },
  isDeleted:{
    type: Sequelize.BOOLEAN,
    
    defaultValue: false,  
  }, 
});

module.exports = Testimonial;
