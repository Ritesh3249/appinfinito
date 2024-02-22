const Joi = require("joi");
const JoiValidator = require("./joiValidator");
const  { joiPasswordExtendCore } = require( "joi-password")

const JoiPassword = Joi.extend(joiPasswordExtendCore);

class AuthValidator extends JoiValidator {
  validateUser(obj) {
    return this.validate(
      {
        
        pan_id: Joi.string().max(50).required(),
        email_id: Joi.string().email().max(255).required(),
        mobile: Joi.string().max(50).required(),
        password: Joi.string().required(),
        state: Joi.string().max(100).required(),
        city: Joi.string().max(100).required(),
        address_line_1: Joi.string().max(255).allow(null,""),
        address_line_2: Joi.string().max(255).allow(null,""),
        user_name: Joi.string().max(255).required(), 
        // status: Joi.boolean().optional(),
        // created_date: Joi.date().max("now").optional(),
        // create_by: Joi.string().optional(),
        // updated_at: Joi.date().max("now").optional(),
        // updated_by: Joi.string().optional(),
      },
      obj
    );
  }


 

  validateLogin(obj) {
    return this.validate(
      {
        email_id: Joi.string().required(),
        password: Joi.string().required(),
      },
      obj
    );
  }
  validateUpdateUser(obj) {
    return this.validate(
      {
        
        pan_id: Joi.string().max(50),
        user_id:Joi.string().required(),
        email_id: Joi.string().email().max(255),
        mobile: Joi.string().max(50),
        state: Joi.string().max(100),
        city: Joi.string().max(100),
        status:Joi.boolean(),
        address_line_1: Joi.string().max(255),
        address_line_2: Joi.string().max(255),
        user_name: Joi.string().max(255),
        
        // created_date: Joi.date().max("now").optional(),
        // create_by: Joi.string().optional(),
        // updated_at: Joi.date().max("now").optional(),
        // updated_by: Joi.string().optional(),
      },
      obj
    );
  }


}

module.exports = new AuthValidator();
