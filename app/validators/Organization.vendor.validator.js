const Joi = require("joi");
const JoiValidator = require("./joiValidator");
const { joiPasswordExtendCore } = require("joi-password")

const JoiPassword = Joi.extend(joiPasswordExtendCore);

class VendorValidator extends JoiValidator {




    validateVendor(obj) {
        return this.validate({
            vendor_name: Joi.string().required(),
            email_id: Joi.string().required(),
            image_url: Joi.array(),
            mobile: Joi.string().required(),
            state: Joi.string().allow(null, ""),
            city: Joi.string().allow(null, ""),
            address_line_1: Joi.string().allow(null, ""),
            address_line_2: Joi.string().allow(null, ""),
            status:Joi.boolean().required(),
        }, obj);
    }

    validateUpdateVendor(obj) {
        return this.validate({
            vendor_name: Joi.string(),
            email_id: Joi.string(),
            vendor_id: Joi.string().required(),
            image_url: Joi.array(),
            mobile: Joi.string(),
            state: Joi.string(),
            city: Joi.string(),
            address_line_1: Joi.string(),
            address_line_2: Joi.string(),
            status: Joi.boolean()
        }, obj);
    }

}

module.exports = new VendorValidator();
