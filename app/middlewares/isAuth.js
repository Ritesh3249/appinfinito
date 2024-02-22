const SuperAdmin = require("../model/SuperAdmin/SuperAdmin");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const Organization = require("../model/Organization/Organization");
const message = require("../messages/message");
const User = require("../model/User/User");
const { SECRET_ACCESS_KEY } = process.env

async function isAuthSuperAdmin(req, res, next) {
  
    let token = req.headers.authorization; 
    if (!token) throw new createHttpError(401,  message.validation.authorizedToken);
    
    // Check if the token is in the "Bearer <token>" format
    if (!token.startsWith("Bearer ")) {
      throw new createHttpError(401, "Invalid token format");
    }

    // Extract the token part after "Bearer "
    token = token.split(" ")[1];

    if (!token) throw new createHttpError(401, message.validation.authorizedToken );

    let findUser = jwt.verify(token,SECRET_ACCESS_KEY);


    // Verify the token with the secret key
    let data = await SuperAdmin.findOne({ where: { email_id: findUser.email_id, id:findUser.id } })
   
    if (data) {
   
      req.user = findUser;
      next();
       
    } else {
      throw createHttpError.Unauthorized( message.validation.userNotExist)
  
    }
  






}



async function isAuthOrganization(req, res, next) {
  let token = req.headers.authorization;
  if (!token) throw new createHttpError(401,message.validation.authorizedToken);

  token = token.split(" ")[1];
  if (!token) throw new createHttpError(401, message.validation.authorizedToken);
  let findUser = jwt.verify(token,SECRET_ACCESS_KEY);
  console.log(findUser,"sadfasdf")
  let data = await Organization.findOne({ where: { email_id: findUser.email_id, id:findUser.id,org_id:findUser.org_id ,isDeleted:false} })
   
  if (data) {
    console.log("We are here")
 
    req.user = findUser;
    next();
     
  } else {
    throw createHttpError.Unauthorized(message.validation.userNotExist)

  }

}

async function isAuthUser(req, res, next) {
  let token = req.headers.authorization;
  if (!token) throw new createHttpError(401,message.validation.authorizedToken);

  token = token.split(" ")[1];
  if (!token) throw new createHttpError(401, message.validation.authorizedToken);
  let findUser = jwt.verify(token,SECRET_ACCESS_KEY);
 
  let data = await User.findOne({ where: { email_id: findUser.email_id, id:findUser.id,isDeleted:false} })
   
  if (data) { 
 
    req.user = findUser;
    next();
     
  } else {
    throw createHttpError.Unauthorized(message.validation.userNotExist)

  }

}
module.exports = {
  isAuthSuperAdmin,
  isAuthOrganization,
  isAuthUser
};
