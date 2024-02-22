const Joi = require("joi");
const JoiValidator = require("./joiValidator");
const { joiPasswordExtendCore } = require("joi-password")

const JoiPassword = Joi.extend(joiPasswordExtendCore);

class SlotValidator extends JoiValidator {




    validateSlot(obj) {
        return this.validate({
            
        }, obj);
    }

   

}

module.exports = new SlotValidator();
