const userService = require('./userService');

const login = async (email, password) => {
    return await userService.login(email, password);
}
const register = async (email, password, name) => {
    try {
        return await userService.register(email, password, name);
    } catch (error) {
        console.log("error: ", error);
    }
}

const bookmark = async (idUser, idStory) => {
    try {
        return await userService.bookmark(idUser, idStory);
    } catch (error) {
        throw error;
    }
}

const getBookmark = async (idUser) => {
    try {
        return await userService.getBookmark(idUser);
    } catch (error) {
        throw error;
    }
}


module.exports = { login, register, bookmark, getBookmark }