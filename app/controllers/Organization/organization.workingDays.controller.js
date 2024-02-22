const createHttpError = require("http-errors");
const message = require("../../messages/message");
const Vendor = require("../../model/Organization/Vendor");

const organizationWorkingDayValidation = require("../../validators/Organization.workingDay.validator");
const WorkingDays = require("../../model/Organization/WorkingDays");
const Service = require("../../model/Organization/Service");
const Slot = require("../../model/Organization/Slot");
const { createWorkingDays } = require("../Common/common.controller");
const { createInitialSlots } = require("../../helpers/Cron/cron");
const { Sequelize } = require("sequelize");


class OrganizationWorkingDayController {

    async updateWorkingDays(req, res) {

        // const { product_name, image_url, sub_category_id, price, discounted_price, description } = await organizationVendorValidation.validateProduct(req.body)
        const bodyData = await organizationWorkingDayValidation.validateWorkingDay(req.body)
        const { org_id } = req.user;
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        
        const receivedDays = bodyData.dayAndTime.map(({ day }) => day);
  
        // If the payload data is not in sequence
        for (let i = 0; i < receivedDays.length - 1; i++) {
          const currentDayIndex = days.indexOf(receivedDays[i]);
          const nextDayIndex = days.indexOf(receivedDays[i + 1]);
  
          if (currentDayIndex === -1 || nextDayIndex === -1 || currentDayIndex >= nextDayIndex) {
            return res.status(400).send('Days in the dayAndTime payload must be in sequence.');
          }
        }

        let workingDays = await WorkingDays.findAll({ where: { org_id ,isDeleted:true} });

        // // If the working days not available so create
         if (workingDays.length<=0) {
          createWorkingDays(org_id)
        }


        // Update days which i am getting from frontend
        for (let index = 0; index < bodyData.dayAndTime.length; index++) {
            let data = bodyData.dayAndTime[index]
            await WorkingDays.update({
                day: data?.day, openingTime: data?.openingTime,
                closingTime: data?.closingTime, isDeleted: data?.isDeleted,org_id
            }, { where: { org_id,day: data?.day } })
        }

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDate = tomorrow.toISOString().split('T')[0];
    
        // Delete slots where the slotDate is greater than or equal to tomorrow
        const deletedRows = await Slot.destroy({
          where: {
            slotDate: {
              [Sequelize.Op.gte]: tomorrowDate,
            },
            org_id
          },
        });
    
        await createInitialSlots()

        res.status(200).send('Working days updated successfully');




    }
   



}
module.exports = new OrganizationWorkingDayController();

