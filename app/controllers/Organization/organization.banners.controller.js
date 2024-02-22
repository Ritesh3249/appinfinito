const createHttpError = require("http-errors");
const message = require("../../messages/message"); 

const organizationBannerValidation = require("../../validators/Organization.banner.validator");
const { calculatePercentageDiscount } = require("../../services/common.service");
const { create, getAll, getById, updateById, deleteById, getAllWithOutSearch } = require("../../services/crud.service");
const Banner = require("../../model/Organization/Banner");
const { findNotExists } = require("../../services/validation.service");

class OrganizationBannerController {

  async createBanner(req, res) {
    const bodyData = organizationBannerValidation.validateBanner(req.body)
   const {image_url,status,type,type_id} = bodyData
   const { org_id } = req.user;

      bodyData.org_id = org_id
    if(type != "external_link" && type != "service" && type != "product" && type != "sub_category" && type != "category" ){
            throw createHttpError.NotAcceptable("This type does not exists")

    }
      await create(Banner,bodyData,message.Banner.created,res)

  }
  async getAllBanner(req, res) {
    let page = req.query?.page || '0'
    let limit = req.query?.limit || "100"
    let search = req.query?.search || ""
    // const { sub_category_id } = req.query || '0';
    const { org_id } = req.user;
    search = search.toLowerCase()

     
    await getAll(Banner,{  org_id },message.Banner.getAll,res,page,limit,search,"type")

  }
  async getBannerById(req, res) {
    let { banner_id } = req.query || '0';
    let { org_id } = req.user;

  let data =   await findNotExists(Banner,{
      id: banner_id,
      org_id, 
      isDeleted: false
    },message.validation.bannerNotExists)
    data.type_option = {
      id : data?.type_id || null,
      name : data?.type_name || null
    }
    console.log(data,"asdfsadf")
    delete data.type_id
    delete data.type_name
res.status(200).send({message:"Get banner by id",data})
    // let data
    // await getById(Banner,{ org_id, id: banner_id},"Banner by id",res)

  }

  async updateBanner(req, res) {
    const bodyData=  await organizationBannerValidation.validateUpdateBanner(req.body)
         const {org_id} = req.user; 
         if(bodyData?.type && !bodyData?.type_id){
          throw createHttpError.NotAcceptable("type_id is required")
         }
      let findBanner = await findNotExists(Banner,{org_id,id:bodyData.banner_id},message.validation.bannerNotExists)
      // if (bodyData.type === "category") {
      //   bodyData.category = bodyData.type_id;
      //   bodyData.sub_category = null;
      //   bodyData.product = null;
      //   bodyData.service = null;
      //   bodyData.external_link = null;
      // } else if (bodyData.type === "sub_category") {
      //   bodyData.sub_category = bodyData.type_id;
      //   bodyData.category = null;
      //   bodyData.product = null;
      //   bodyData.service = null;
      //   bodyData.external_link = null;
      // } else if (bodyData.type === "product") {
      //   bodyData.product = bodyData.type_id;
      //   bodyData.category = null;
      //   bodyData.sub_category = null;
      //   bodyData.service = null;
      //   bodyData.external_link = null;
      // } else if (bodyData.type === "service") {
      //   bodyData.service = bodyData.type_id;
      //   bodyData.category = null;
      //   bodyData.sub_category = null;
      //   bodyData.product = null;
      //   bodyData.external_link = null;
      // } else if (bodyData.type === "external_link") {
      //   bodyData.external_link = bodyData.type_id;
      //   bodyData.category = null;
      //   bodyData.sub_category = null;
      //   bodyData.product = null;
      //   bodyData.service = null;
      // }
       
      // if(bodyData.type_id && !bodyData.type ){
      //   bodyData[findBanner.type] = bodyData.type_id
      // }
      // console.log(bodyData,"asdf")
      await updateById(Banner,bodyData,message.Banner.updated,res,{org_id,id:bodyData.banner_id})
      
  }
  async deleteBanner(req, res) {
    const { banner_id } = req.body;
  
    const { org_id } = req.user;

    let data = await findNotExists(Banner,{
      id: banner_id,
      org_id
    },message.validation.bannerNotExists)
    
   
    await deleteById(Banner,{ id: banner_id },message.Banner.deleted ,res)
 
    
  }


}
module.exports = new OrganizationBannerController();

