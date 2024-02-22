const Sequelize = require("sequelize");
const sequelize = require("../../startup/db");

const Vendor = sequelize.define("Vendor", {
  vendor_name: {
    type: Sequelize.STRING(255),
    allowNull: true,
    set(value) {
      this.setDataValue('vendor_name', value.toLowerCase());
    },
  },
    email_id: {
    type: Sequelize.STRING(255),
    allowNull: true,
     
  },
  image_url: {
    type:  Sequelize.ARRAY(Sequelize.STRING),
    defaultValue:[],
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
  org_id: {
    type:  Sequelize.STRING(255),
    defaultValue: "",  
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true, 
  },
  
  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    
},
});

module.exports = Vendor;
