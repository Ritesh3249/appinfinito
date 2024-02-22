const Joi = require("joi");
const JoiValidator = require("./joiValidator");
const  { joiPasswordExtendCore } = require( "joi-password")

const JoiPassword = Joi.extend(joiPasswordExtendCore);

class AuthValidator extends JoiValidator {
  validateOrganization(obj) {
    return this.validate(
      {
        
        pan_id: Joi.string().max(50).required(),
        email_id: Joi.string().email().max(255).required(),
        mobile: Joi.string().max(50).required(),
        state: Joi.string().max(100).required(),
        city: Joi.string().max(100).required(),
        address_line_1: Joi.string().max(255).allow(null,""),
        address_line_2: Joi.string().max(255).allow(null,""),
        legal_name: Joi.string().max(255).required(),
        gstin: Joi.string().max(255).allow(null,""),
        website_url: Joi.string().max(255).allow(null,""),
        // status: Joi.boolean().optional(),
        // created_date: Joi.date().max("now").optional(),
        // create_by: Joi.string().optional(),
        // updated_at: Joi.date().max("now").optional(),
        // updated_by: Joi.string().optional(),
      },
      obj
    );
  }


  validateCreatePasswordOfOrganization(obj) {
    return this.validate(
      {
        
        code: Joi.string().required(),
        password: JoiPassword.string()
          .min(8)
          .minOfSpecialCharacters(1)
          .minOfUppercase(1)
          .minOfNumeric(1)
          .required(),
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
  validateUpdateOrganization(obj) {
    return this.validate(
      {
        
        pan_id: Joi.string().max(50),
        org_id:Joi.string().required(),
        email_id: Joi.string().email().max(255),
        mobile: Joi.string().max(50),
        state: Joi.string().max(100),
        city: Joi.string().max(100),
        status:Joi.boolean(),
        address_line_1: Joi.string().max(255),
        address_line_2: Joi.string().max(255),
        legal_name: Joi.string().max(255),
        gstin: Joi.string().max(255),
        website_url: Joi.string().max(255),
        
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
