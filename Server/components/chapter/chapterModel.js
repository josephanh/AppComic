const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    // _id: { type: ObjectId }, // khóa chính
    title: {type: String},
    content: {type: String},
    chapter_index: {type: Number},
    date_created: {type: String},
    date_update: {type: String},
});
module.exports = mongoose.models.chapter || mongoose.model('chapter', schema);
// chapter -----> chapters