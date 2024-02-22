const WorkingDays = require("../../model/Organization/WorkingDays");
const Slot = require("../../model/Organization/Slot");

const moment = require("moment")
const { Op, Sequelize } = require('sequelize');
const { createWorkingDays } = require("../../controllers/Common/common.controller");
const Services = require("../../model/Organization/Service");
const Organization = require("../../model/Organization/Organization");
async function createSlotForService (service_name,org_id,slot_duration){
   
    // Get active working days for the organization
    let activeWorkingDays = await WorkingDays.findAll({
        where: {
            org_id,
            isDeleted: false,
        },
    });
    if (activeWorkingDays.length<=0) { // if working day data are not available then create
        createWorkingDays(org_id)
        activeWorkingDays = await WorkingDays.findAll({
            where: {
                org_id,
                isDeleted: false,
            },
        });
    }
    // Get the current date
    const currentDate = new Date();
 

    // Counter to ensure we generate slots for the next 7 working days
    let daysCounter = 0;

    // Iterate to create slots for the next 7 active working days

    let breaker = true;
    
    let count = 0;
    while (count <= 7 ) { // This variable will false when we have 7 slots in generated slot array 
        const nextDate = new Date(currentDate);
         
        nextDate.setDate(currentDate.getDate() + daysCounter); // To get the date according to the increment of dayCounter

        const options = { weekday: 'long', timeZone: 'UTC' }; // We want time in UTC 

        const dayOfWeek = nextDate.toLocaleDateString('en-US', options); // Day from the date
      
        const activeDay = activeWorkingDays.find(day => day.day === dayOfWeek); // To get the Single object of the array according to the dayOfweek we find

        // Check if the current day is an active working day
        if (activeDay) { 
            const slotDate = nextDate.toISOString().split('T')[0];
            let findSlot = await Slot.findOne({where:{slotDate:slotDate,service: service_name,org_id}})
            if(findSlot){ // if the slots are already created so the loop will countinue from here 
                console.log(count)
               count ++;
               daysCounter++; // we incrementing this for the next date
                continue;
            }
            let createdSlot = [];

            let currentTime = activeDay.openingTime; //10:00:00
            let closingTime = activeDay.closingTime; //16:00:00
             
            const referenceDate = new Date(); // Use the current date as a reference
            
            while (currentTime < closingTime) { // This loop will from opening time to closing time
                const startTimeComponents = currentTime.split(':');
                const startTime = new Date(referenceDate);
                startTime.setHours(startTimeComponents[0]);
                startTime.setMinutes(startTimeComponents[1]);
                startTime.setSeconds(startTimeComponents[2] || 0);
            
                const endTime = new Date(startTime.getTime() + parseInt(slot_duration) * 60000); // Convert slot_duration to milliseconds
            
                createdSlot.push({
                    startTime: startTime.toLocaleTimeString('en-US', { hour12: false }),
                    endTime: endTime.toLocaleTimeString('en-US', { hour12: false }),
                    isDeleted: false,
                });
            
                currentTime = endTime.toTimeString().split(' ')[0];
            }
            
            // console.log(createdSlot);
            const slot = {
                day: dayOfWeek,
                schedule: createdSlot,
                slotDate: slotDate,
                service: service_name,  // Replace with the actual service
                org_id,
                isDeleted: false,
            };
             
            if(count == 7){ // If we created the 7 working days slot then the loop will break 
                
                breaker = false;
                break;
            }   
            console.log("we are creating slot")
            await Slot.create(slot) 
            
            daysCounter++;
            count ++;

        }else {
            // Move to the next day
            daysCounter++;
        }
        if(count == 7){ // If we created the 7 working days slot then the loop will break 
            console.log("we are in the breakkk")
            breaker = false;
            break;
        } 
    }
    
    console.log("slot created success fully")
} 
async function createInitialSlots() {
      
    let findAllService = await Services.findAll({where:{isDeleted:false},raw:true})

    findAllService.map((item)=>{
        
        createSlotForService(item.service_name,item.org_id,item.slot_duration)

    })
   
}

async function deactivatePreviousDateSlots() {
    try { 
      const currentDate = new Date();
  
      // Format the current date to match the format used in the slotDate field
      const formattedCurrentDate = currentDate.toISOString().split('T')[0];
  
      let getAllOrg = await Organization.findAll({where:{isDeleted:false},raw:false})

      getAllOrg.map(async (item)=>{
        await Slot.update(
            { isDeleted: true },
            {
              where: {
                org_id:item.org_id,
                isDeleted: false,
                slotDate: {
                  [Sequelize.Op.lt]: formattedCurrentDate,
                },
              },
            }
          );
      })

      // Update isDeleted to false for previous date slots
    
  
      console.log('Previous date slots have been deactivated.');
    } catch (error) {
      console.error('Error deactivating previous date slots:', error.message);
    }
  }
module.exports = {
    createInitialSlots,createSlotForService,deactivatePreviousDateSlots
}

