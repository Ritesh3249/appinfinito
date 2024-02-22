 const message = require("../../messages/message"); 
const SuperAdmin = require("../../model/SuperAdmin/SuperAdmin");
const organizartionValidator = require("../../validators/Organization.auth.validator")
const JoiValidator = require("../../validators/joiValidator")
const {sendEmail} = require("../../helpers/AWS/sendMail")
// const emailConstants = require("../../helpers/AWS")
const createHttpError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const organizationCreatePassword = require("../../helpers/EmailTemplates/createPassword")
const Organization = require("../../model/Organization/Organization");
const { SECRET_ACCESS_KEY } = process.env;
const { uid } =require( 'uid');
const sequelize = require("../../startup/db"); 
const { createWorkingDays } = require("../Common/common.controller");

async function generateNextOrgId() {
  // Find the last organization with the highest org_id
  const lastOrganization = await Organization.findOne({
    attributes: [
      [sequelize.fn('MAX', sequelize.col('org_id')), 'maxOrgId']
    ]
  });

  // Extract the maximum org_id value
  const maxOrgId = lastOrganization.getDataValue('maxOrgId');

  // Generate the next org_id
  let nextOrgId = 'AI00001';
  if (maxOrgId) {
    // Increment the numeric part of the org_id
    const numericPart = parseInt(maxOrgId.slice(2), 10) + 1;
    nextOrgId = `AI${numericPart.toString().padStart(5, '0')}`;
  }

  return nextOrgId;
}
class OrganizationAuthController {
  async register(req, res) { 
    const bodyData = await organizartionValidator.validateOrganization(req.body)
    
     
    let userFound = await Organization.findOne({
      where: {
        email_id: bodyData.email_id,
        isDeleted:false
      }, 
    })

    if (userFound) {
      throw createHttpError(401,message.validation.emailAlreadyExist);
    }
    bodyData.nano_id = uid(16)
    bodyData.org_id = await generateNextOrgId()
    createWorkingDays(org_id)
    let data = await Organization.create(bodyData)
   
    if (data) {
       
        var tokenforPassword = jwt.sign(
            {
              id: data.id,
              email_id:data.email_id,
              org_id:data.org_id
            },
            SECRET_ACCESS_KEY,
            {
              expiresIn: '3d',
            }
        );
      
    }
    const htmlBody = organizationCreatePassword(tokenforPassword);

    sendEmail(data.email_id, htmlBody);
    // sendNodeMail(data.email, emailConstants.cc, subject, htmlBody, emailConstants.txtBody, emailConstants.from, emailConstants.replyTo);
 
    return res.status(200).send({ message: message.Organization.registered ,tokenforPassword});
  }

    async createPasswordOfOrg(req, res){
      console.log(req.body,"sadfsdf")

      let credentials = await organizartionValidator.validateCreatePasswordOfOrganization(req.body)
      const decodedToken =  jwt.verify(credentials.code,  SECRET_ACCESS_KEY)
   
      credentials.password = bcrypt.hashSync(credentials.password, 12);
      
      let data =  await Organization.findOne({
        where: {
          // email: email,
          id: decodedToken.id,
          isDeleted: false,
        },
      })
      if (!data) {
        throw createHttpError.NotFound( message.validation.userNotExist)
      }
      
      
        data.password = credentials.password;
        data.save();
            
    
      return res.status(200).json({ message: message.Organization.createdPassword });


    }
  async login(req, res) {
    const {email_id,password} =  await organizartionValidator.validateLogin(req.body)
    const loginData =   await Organization.findOne({
      where: {
        email_id: { [Op.iLike]: email_id },
        isDeleted: false,
      },
      raw:true
     
    }); 
   

    if (!loginData ) {
      throw createHttpError.NotFound(message.validation.emailNotExist)
    }
    if (!loginData.password ) {
      throw createHttpError.NotFound(message.validation.passwordNotExist)
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
   
 
    
    return res.status(200).send({ message: message.Organization.login, token });
  }
 
 
}


module.exports = new OrganizationAuthController();