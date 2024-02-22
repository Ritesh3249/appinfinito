const message = require("../../messages/message"); 
 
const {sendEmail} = require("../../helpers/AWS/sendMail")
// const emailConstants = require("../../helpers/AWS")
const createHttpError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize"); 
const { SECRET_ACCESS_KEY } = process.env;
const userRegister = require("../../helpers/EmailTemplates/userRegister");
const userAuthValidator = require("../../validators/User.auth.validator");
const User = require("../../model/User/User");
const { findNotExists } = require("../../services/validation.service");
const Organization = require("../../model/Organization/Organization");

 
class UserAuthController {
  async register(req, res) { 
    const bodyData = await userAuthValidator.validateUser(req.body)
    const org_id = req.headers?.org_id
    if(!org_id){
        throw createHttpError.NotAcceptable("Organization Id is required")
    }

    await findNotExists(Organization, {
      org_id,
      isDeleted: false
    },message.validation.organizationNotExist)
    
    let userFound = await User.findOne({
      where: {
        email_id: bodyData.email_id,
        org_id,
        isDeleted:false
      }, 
    })

    if (userFound) {
      throw createHttpError(401,message.validation.emailAlreadyExist);
    }
    bodyData.password = bcrypt.hashSync(bodyData.password, 12);
  bodyData.org_id = org_id;
    let data = await User.create(bodyData)
   
    if (data) {
       
        var tokenforPassword = jwt.sign(
            {
              id: data.id,
              email_id:data.email_id,
              org_id
            },
            SECRET_ACCESS_KEY,
            {
              expiresIn: '3d',
            }
        );
      
    }
    const htmlBody = userRegister();

    sendEmail(data.email_id, htmlBody);
    // sendNodeMail(data.email, emailConstants.cc, subject, htmlBody, emailConstants.txtBody, emailConstants.from, emailConstants.replyTo);
 
    return res.status(200).send({ message: message.User.registered ,tokenforPassword});
  }

    
  async login(req, res) {
    const {email_id,password} =  await userAuthValidator.validateLogin(req.body)
    const loginData =   await User.findOne({
      where: {
        email_id: { [Op.iLike]: email_id },
        isDeleted: false,
      },
      raw:true
     
    }); 
   

    if (!loginData  ) {
      throw createHttpError.NotFound(message.validation.emailNotExist)
    }
    var passwordIsValid = bcrypt.compareSync(password, loginData.password);

    if (!passwordIsValid) {
      throw createHttpError.NotFound( message.validation.invalidPassword)

    }

  
    var token = jwt.sign(
      {
        id: loginData.id,
        email_id:loginData.email_id,
        org_id:loginData.org_id
      },
      SECRET_ACCESS_KEY,
      {
        expiresIn: "12000h",
      }
    );
   
 
    
    return res.status(200).send({ message: message.User.login, token });
  }
 
 
}


module.exports = new UserAuthController();