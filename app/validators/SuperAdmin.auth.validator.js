const Joi = require("joi");
const JoiValidator = require("./joiValidator");

class AuthValidator extends JoiValidator {

  validateRegister(obj) {
    return this.validate(
      {
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        email_id: Joi.string().email().required(),
        password:Joi.string().required()
        
      }
      , obj)
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

}

module.exports = new AuthValidator(); 