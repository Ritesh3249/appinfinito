const Joi = require("joi");
const JoiValidator = require("./joiValidator");
const { joiPasswordExtendCore } = require("joi-password")

const JoiPassword = Joi.extend(joiPasswordExtendCore);

class SlotBookingValidator extends JoiValidator {




    validateSlotBooking(obj) {
        return this.validate({
            slot_id: Joi.string().required(),
            user_id: Joi.string(),
            startTime: Joi.string().required(),
            endTime: Joi.string().required(),
            user_message:Joi.string().allow(null,"")
        }, obj);
    }

    

}

module.exports = new SlotBookingValidator();
