 


const Sequelize = require('sequelize');
const sequelize = require('../../startup/db');


const WorkingDays = sequelize.define('WorkingDays', {
    day: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            isIn: [['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']],
        },
    },
    openingTime: {
        type: Sequelize.TIME,
        allowNull: true,
        defaultValue: '09:00',
    },
    closingTime: {
        type: Sequelize.TIME,
        allowNull: true,
        defaultValue: '18:00'
    },
    org_id: {
        type:  Sequelize.STRING(255),
        defaultValue: "",  
      },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = WorkingDays;
