const userModel = require('./userModel');
const bcryptjs = require('bcryptjs')
const login = async (email, password) => {
    try {
        let user = await userModel.findOne({ email: email });
        if (user) {
            let check = bcryptjs.compareSync(password, user.password);
            return check ? user : false;
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}

const register = async (email, password, name) => {
    try {
        // kiểm tra tài khoản đã tồnt tại hay chưa,
        const user = await userModel.findOne({ email: email });
        if (!user) {
            var salt = bcryptjs.genSaltSync(10);
            var hash = bcryptjs.hashSync(password, salt);
            const newUser = { email, password: hash, name, role: 1, avatar: {name: 'no-image', url: ""}};
            console.log(newUser);
            await userModel.create(newUser);
            return true;
        }
    } catch (error) {
        console.log("error: ", error);
    }
    return false
}

const bookmark = async (idUser, idStory) => {
    try {
        console.log(idUser, idStory);
        const user = await userModel.findOne(
            { _id: idUser, bookmark: idStory },
        )
        console.log(user);
        if (user) {
            const remove = await userModel.findOneAndUpdate(
                { _id: idUser },
                { $pull: { bookmark: idStory } }
            )
            if(remove) return true;
        } else {
            const add = await userModel.findOneAndUpdate(
                { _id: idUser },
                { $push: { bookmark: idStory } }
            )
            if (add) return true;
            return false;

        }

    }
    catch (error) {

    }
}

const getBookmark = async (idUser) => {
    try {
        return await userModel.findById(idUser).populate('bookmark');
    } catch (error) {
        console.log(error);
        return false;
    }
}
module.exports = { login, register, bookmark, getBookmark }
var users = [
    {
        _id: 1,
        email: 'anh@gmail.com',
        password: '12345@@@',
        name: 'Nguyễn Tuấn Anh'
    },
    {
        _id: 2,
        email: 'anh1@gmail.com',
        password: '12345@@@',
        name: 'Trần Thị Thảo'
    },
    {
        _id: 3,
        email: 'anh2@gmail.com',
        password: '12345@@@ ',
        name: 'Nguyễn Ngọc Nhi'
    }
]