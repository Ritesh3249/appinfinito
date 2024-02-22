const message = require("../../messages/message");
 
const userSlotBookingValidation = require("../../validators/User.booking.validator");
const WorkingDays = require("../../model/Organization/WorkingDays");
const Services = require("../../model/Organization/Service"); 
const Slot = require("../../model/Organization/Slot");
const SlotBooking = require("../../model/User/SlotBooking");
const { Sequelize } = require("sequelize");
const { validateSlotBooking } = require("../../validators/User.booking.validator");
const { findNotExists } = require("../../services/validation.service");

class UserSlotBookingController {
 

async bookASlot(req,res){

  const bodyData = await userSlotBookingValidation.validateSlotBooking(req.body)

   await findNotExists(Slot, {
    id: bodyData.slot_id,
    isDeleted: false
  }, message.validation.slotNotExists)

  await create(SlotBooking, bodyData, message.SlotBook.booked, res)

  
}


}

module.exports = new UserSlotBookingController();

