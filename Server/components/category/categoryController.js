const categoryService = require('./categoryService')

const getAllCategory = async () => {
    try {
        const resulft = await categoryService.getAllCategory();
        // console.log(resulft);
        return resulft;
    } catch (error) {
        console.log('categoryController', error);
    }
}

module.exports = { getAllCategory };