const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {type: String},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: Number, default: 1},
    avatar: {type: Object},
    bookmark: [{type: ObjectId, ref: 'story'}],

    // 1: user,
    // 100: admin
    // 1000: system

});
module.exports = mongoose.models.user || mongoose.model('user', schema);
// user -----> users