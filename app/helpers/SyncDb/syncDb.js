const sequelize = require('../../startup/db');  
 


 function syncDb(req,res){
    
  sequelize
  .sync({alter:true})
  .then((result) => {
    console.log(result);
    res.send("db is syncing")
  })
  .catch((err) => {
    console.log(err);
  });
}
module.exports = syncDb