const categoryModel = require('./categoryModel');

const getAllCategory = async () => {
    try {
        // return Data;
        // select * from categories -- lấy hết tẩt cả
        return await categoryModel.find();
    } catch (error) {
        console.log('Error categoryService ', error)
    }
    return []
}

module.exports = {getAllCategory}

var Data = [{
    "_id": 1,
    "name": "Oak Harbor"
}, {
    "_id": 2,
    "name": "Masasi"
}, {
    "_id": 3,
    "name": "Varkaus / Joroinen"
}, {
    "_id": 4,
    "name": "Aguaclara"
}, {
    "_id": 5,
    "name": "Batumi"
}, {
    "_id": 6,
    "name": "Porvenir"
}, {
    "_id": 7,
    "name": "Colorado Springs"
}, {
    "_id": 8,
    "name": "Rajouri"
}, {
    "_id": 9,
    "name": "Buenos Aires"
}, {
    "_id": 10,
    "name": "Mao"
}]
