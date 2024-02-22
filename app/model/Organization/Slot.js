// models/slot.js

const Sequelize = require('sequelize');
const sequelize = require('../../startup/db');


  const Slot = sequelize.define('Slot', {
    day: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']],
      },
    },
    schedule: {
      type: Sequelize.ARRAY(
        Sequelize.JSONB({
          startTime: Sequelize.STRING,
          endTime: Sequelize.STRING,
          isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
        })
      ),
      defaultValue: [],
    },
    slotDate:{
      type:  Sequelize.STRING(255),
      defaultValue: "", 
    },
    service:{
      type:  Sequelize.STRING(255),
      defaultValue: "", 
    },
    org_id: {
      type:  Sequelize.STRING(255),
      defaultValue: "",  
    },

    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  }
  
  );

  module.exports = Slot;

