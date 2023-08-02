const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    // _id: { type: ObjectId }, // khóa chính
    title: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        // unique: true, // không được trùng
        trim: true, // bỏ khoảng trắng 2 đầu
        minlength: 3, // độ dài tối thiểu
        maxlength: 255, // độ dài tối đa
        default: 'No name' // giá trị mặc định
    },
    author: {type: String},
    image: {type: Object},
    describe: {type: String},
    reader: [{type: ObjectId, ref: 'user'}],
    
    liked: [{type: ObjectId, ref: 'user'}],
    chapters: [{type: ObjectId, ref: 'chapter'}],
    category: {type:  String, ref: 'category'},
    dateCreated: {type: String},
    // ref: là một option để cho mongoose có thể hiểu là nó liên kết với model nào
    // chắc là đọc theo tên của model
});
module.exports = mongoose.models.story || mongoose.model('story', schema);
// story -----> stories