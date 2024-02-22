const { Op } = require("sequelize");

const commonExclude = ['createdAt', 'updatedAt', 'isDeleted']
class CRUDservice {

    async create(table, bodyData, validationMessage, res) {
        await table.create(bodyData)
        return res.status(200).send({ message: validationMessage });
    }
    async getAll(table, bodyData, validationMessage, res, page, limit,search='',name='', excludeData = []) {
        let excludingData = commonExclude.concat(excludeData)
        search = search.toLowerCase()
        let newPage = 0
        let newLimit = parseInt(limit)

        if (parseInt(page) == 0) newPage = (parseInt(page)) * parseInt(limit)
        else newPage = (parseInt(page) - 1) * parseInt(limit)
        let status= {
            [Op.like]: `%${search || ''}%`,
        }

        bodyData[name]= status

        bodyData.isDeleted = false

        let data = await table.findAll({ where: bodyData, offset: newPage, limit: newLimit, order: [['id', 'ASC']], attributes: { exclude: excludingData }, raw: true })

        return res.status(200).send({ message: validationMessage, data })

    }
    async getAllWithOutSearch(table, bodyData, validationMessage, res, page, limit, excludeData = []) {
        let excludingData = commonExclude.concat(excludeData)

        let newPage = 0
        let newLimit = parseInt(limit)

        if (parseInt(page) == 0) newPage = (parseInt(page)) * parseInt(limit)
        else newPage = (parseInt(page) - 1) * parseInt(limit)
        // let status= {
        //     [Op.like]: `%${search || ''}%`,
        // }

        // bodyData[name]= status

        bodyData.isDeleted = false

        let data = await table.findAll({ where: bodyData, offset: newPage, limit: newLimit, order: [['id', 'ASC']], attributes: { exclude: excludingData }, raw: true })

        return res.status(200).send({ message: validationMessage, data })

    }

    async getAllWithSingleImageUrl(table, bodyData, validationMessage, res, page, limit,search='',name='', excludeData = []) {
        let excludingData = commonExclude.concat(excludeData)
        search = search.toLowerCase()
        let newPage = 0
        let newLimit = parseInt(limit)

        if (parseInt(page) == 0) newPage = (parseInt(page)) * parseInt(limit)
        else newPage = (parseInt(page) - 1) * parseInt(limit)
        let status= {
            [Op.like]: `%${search || ''}%`,
        }

        bodyData[name]= status

        bodyData.isDeleted = false

        let data = await table.findAll({ where: bodyData, offset: newPage, limit: newLimit, order: [['id', 'ASC']], attributes: { exclude: excludingData }, raw: true })
        
    data = data.map(item => {
        if (item?.image_url && item?.image_url.length > 0) {
            item.image_url = item.image_url[0];
        }
        return item;
    });

        return res.status(200).send({ message: validationMessage, data })

    }
    
    async getById(table, bodyData, validationMessage, res, excludeData = []) {
        let excludingData = commonExclude.concat(excludeData)
        bodyData.isDeleted = false

        let data = await table.findOne({ where: bodyData, attributes: { exclude: excludingData }, raw: true })

        return res.status(200).send({ message: validationMessage, data })

    }
    async updateById(table, bodyData, validationMessage, res, condition) {

        condition.isDeleted = false

        await table.update(bodyData, { where: condition })

        return res.status(200).send({ message: validationMessage })

    }
    async deleteById(table, bodyData, validationMessage, res) {

        await table.update({ isDeleted: true }, { where: bodyData })
        return res.status(200).send({ message: validationMessage })

    }
}

module.exports = new CRUDservice();