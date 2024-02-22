const { JsonWebTokenError } = require("jsonwebtoken"); 

module.exports = (err, req, res, next) => {
  let { status, message,name } = err;
  console.log(err,"error in middleware")
  if (err instanceof JsonWebTokenError) {
    status = 401;
    // console.log("sdfsadfasdfsad");
    
  }
  
  if (!status) {
    status = 500;
    message = "Internal Server Error"
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    status = 400; // Bad Request
    const constraintErrors = err.errors.map((error) => error.path);
    message = `${constraintErrors.join(', ')} already exists.`;
  }
  if (name === "TokenExpiredError") {
    status = 401; // Bad Request
    
    message = `The token is expred`;
  }
  console.log(name,"message");
  
  return res.status(status).send({  message}); 
};