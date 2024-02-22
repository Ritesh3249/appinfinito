 
const userSlotBookingValidation = require("../../validators/User.booking.validator");
const WorkingDays = require("../../model/Organization/WorkingDays");
const Services = require("../../model/Organization/Service");
const Slot = require("../../model/Organization/Slot");
const SlotBooking = require("../../model/User/SlotBooking");
const User = require("../../model/User/User");
const { Sequelize } = require("sequelize");
const { validateSlotBooking } = require("../../validators/User.booking.validator");
const { findNotExists } = require("../../services/validation.service");
const message = require("../../messages/message");
const { updateById } = require("../../services/crud.service");

class UserWorkingDayController {



    async getAllBookedSlotList() {
        const { org_id } = req.user;

        let getAllBooking = await SlotBooking.findAll({ where: { isCompleted: false ,org_id} });

        res.status(200).send({ message: "get All booking list", data: getAllBooking })
    }

    async markTheSlotBooked(){
        const bodyData = req.bodyData?.user_id
        const { org_id } = req.user;

        await findNotExists(User, {
            user_id: bodyData.user_id,
            org_id
          },message.validation.userNotExist)

          await updateById(SlotBooking, {isCompleted: true}, message.SlotBook.updated, res, { org_id, id: bodyData.user_id })

    }


}

module.exports = new UserWorkingDayController();

