const createHttpError = require("http-errors");
const message = require("../../messages/message");
 const Staff = require("../../model/Organization/Staff");

const organizationStaffValidation = require("../../validators/Organization.staff.validator");
const { findAlreadyExists, findNotExists } = require("../../services/validation.service");
const { create, getAll, getById, updateById, deleteById } = require("../../services/crud.service");

class OrganizationStaffController {

    async createStaff(req, res) {
        const bodyData=  await organizationStaffValidation.validateStaff(req.body)
         const {org_id} = req.user;
         bodyData.org_id=org_id
    

         await findAlreadyExists(Staff,{org_id,staff_name:bodyData.staff_name}, message.validation.serviceExists)
    
        await create(Staff,bodyData,message.Staff.created,res)
       
      }
      async getAllStaff(req,res){ 
        let page = req.query?.page || '0'
        let limit = req.query?.limit || "100"
        let search = req.query?.search || ""
        const {org_id} = req.user;
        search = search.toLowerCase()

    
        await getAll(Staff,{org_id},"All Staff",res,page,limit,search,"staff_name")
        
      }
      async getStaffById(req,res){
        let {staff_id}=req.query;
        let {org_id} = req.user;
        await findNotExists(Staff,{org_id,id:staff_id},message.validation.staffNotExists)
        await getById(Staff,{org_id,id:staff_id},"Staff by id",res)
        
      }
    
      async updateStaff(req, res) {
        const bodyData=  await organizationStaffValidation.validateUpdateStaff(req.body)
         const {org_id} = req.user; 
         
      await findNotExists(Staff,{org_id,id:bodyData.staff_id},message.validation.staffNotExists)
      await updateById(Staff,bodyData,message.Staff.updated,res,{org_id,id:bodyData.staff_id})
      
      }
      async deleteStaff(req,res){
        const {staff_id} = req.body;
        const {org_id} = req.user;

        await findNotExists(Staff,{org_id,id:staff_id},message.validation.staffNotExists)
        await deleteById(Staff,{org_id,id:staff_id},message.Staff.deleted,res)
       
      }

}
module.exports = new OrganizationStaffController();

