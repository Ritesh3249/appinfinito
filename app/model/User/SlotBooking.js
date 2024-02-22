// models/slot.js

const Sequelize = require('sequelize');
const sequelize = require('../../startup/db');


const SlotBooking = sequelize.define('SlotBooking', {
    // day: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     validate: {
    //         isIn: [['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']],
    //     },
    // },
    // user_id:{
    //     type: Sequelize.STRING,
    //     defaultValue: ""
    // },
    slot_id: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    user_id: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    startTime: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    endTime: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    isCompleted:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    user_message:{
        type: Sequelize.STRING,
        defaultValue: ""
    },
    
    // slotDate: {
    //     type: Sequelize.STRING(255),
    //     defaultValue: "",
    // },
    // service: {
    //     type: Sequelize.STRING(255),
    //     defaultValue: "",
    // },
    // org_id: {
    //     type: Sequelize.STRING(255),
    //     defaultValue: "",
    // },

    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
}

);

module.exports = SlotBooking;

