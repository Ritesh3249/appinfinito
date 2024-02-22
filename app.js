// require("dotenv").config({path:"/opt/mash/.env"});
require("dotenv").config();
const express = require("express");
require("express-async-errors");
const Routes = require("./app/routes/routes") 
const cors = require("cors"); 
const cron = require( 'node-cron');
const cronFile = require("./app/helpers/Cron/cron")

const error = require("./app/middlewares/error");     
const sequelize = require("./app/startup/db");
const Category = require("./app/model/Organization/Category");
const SubCategory = require("./app/model/Organization/SubCategory"); 
const Products = require("./app/model/Organization/Product");
const Services = require("./app/model/Organization/Service");
const Slot = require("./app/model/Organization/Slot");
const SlotBooking = require("./app/model/User/SlotBooking");
const app = express();


// MiddleWares
app.use(cors()); 
app.use(express.json()); 

cron.schedule('0 1 * * *', () => {
  const currentDate = new Date();
  
  console.log(currentDate,"Cron function is running every night at 1 am");
  cronFile.deactivatePreviousDateSlots()
  cronFile.createInitialSlots()
});
 
// Routes
app.use("/v1/api", Routes);

Category.hasMany(SubCategory, { foreignKey: 'category_id' });
SubCategory.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'id' });

// In SubCategory model
SubCategory.hasMany(Products, { foreignKey: 'sub_category_id' });
Products.belongsTo(SubCategory, { foreignKey: 'sub_category_id', targetKey: 'id' });

SubCategory.hasMany(Services, { foreignKey: 'sub_category_id' });
Services.belongsTo(SubCategory, { foreignKey: 'sub_category_id', targetKey: 'id' });

Products.belongsTo(Category, { foreignKey: 'category_id' });
Services.belongsTo(Category, { foreignKey: 'category_id' });
 
//Slots model
 
app.use(error); 
// Listening
app.get("/", (req, res) => {
  res.json("Welcome to the Backend");
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening to ${port}`);
});
