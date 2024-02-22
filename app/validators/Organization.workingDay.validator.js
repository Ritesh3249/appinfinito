const Joi = require("joi");
const JoiValidator = require("./joiValidator");
const { joiPasswordExtendCore } = require("joi-password")

const JoiPassword = Joi.extend(joiPasswordExtendCore);

class WorkingDayValidator extends JoiValidator {




    validateWorkingDay(obj) {
        return this.validate({
            dayAndTime:Joi.array() 
        }, obj);
    }

   

}

module.exports = new WorkingDayValidator();
