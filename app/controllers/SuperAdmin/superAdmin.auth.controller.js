 
const createHttpError = require("http-errors");
const message = require("../../messages/message"); 
const SuperAdmin = require("../../model/SuperAdmin/SuperAdmin");
const authValidator = require("../../validators/SuperAdmin.auth.validator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { SECRET_ACCESS_KEY } = process.env;


class SuperAdminAuthController {
  async register(req, res) {
    
    const bodyData = await authValidator.validateRegister(req.body)
 
    bodyData.password = await bcrypt.hash(bodyData.password, 12)


    let userFound = await SuperAdmin.findOne({
      where: {
        email_id: bodyData.email_id,
      },
    })

    if (userFound) {
      throw createHttpError(401, "Email already exits please try another one.");
    }
     
    let data = await SuperAdmin.create(bodyData)

    if (data) {
      var token = jwt.sign(
        {
          id: data.id,
          email_id:data.email_id
        },
        SECRET_ACCESS_KEY,
        {
          expiresIn: "12000h",
        }
      );

      
    }


    return res.status(200).send({ message: message.SuperAdmin.registered,token });
  }
  async login(req, res) {
    const {email_id,password} =await authValidator.validateLogin(req.body)
    console.log(email_id,"sadfsadf")
    const loginData =   await SuperAdmin.findOne({
      where: {
        email_id: { [Op.iLike]: email_id },
        isDeleted: false,
      },
     
    });
     
   

    if (!loginData ) {
      throw createHttpError.NotFound("Sorry, this email is not registered with us.")
    }
    var passwordIsValid = bcrypt.compareSync(password, loginData.password);

    if (!passwordIsValid) {
      throw createHttpError.NotFound( "Invalid password please try again.")

    }

  
    var token = jwt.sign(
      {
        id: loginData.id,
        email_id:loginData.email_id
      },
      SECRET_ACCESS_KEY,
      {
        expiresIn: "12000h",
      }
    );
   
 
    
    return res.status(200).send({ message: message.SuperAdmin.login, token });
  }
 
}


module.exports = new SuperAdminAuthController();