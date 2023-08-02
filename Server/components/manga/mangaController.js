
const mangaModel = require('./mangaModel');
const mangaService = require('./mangaService');
const chapterService = require('../chapter/chapterService');

const getAllManga = async () => {
    return await mangaService.getAllManga();
}

const getDexuatManga = async () => {
    return await mangaService.getDexuatManga();
}

const getAllMangaBasic = async () => {
    try {
        return await mangaService.getAllMangaBasic();
    } catch (error) {
        throw error;
    }
}

const addNewManga = async (title, author, describe, image, category) => {
    try {
        await mangaService.addNewManga(title, author, describe, image, category)
    } catch (e) {
        console.log('add-new-manga-controller', e);
    }
}

const deleteManga = async (id) => {
    try {
        return await mangaService.deteteMangabyId(id);
    } catch (error) {
        throw error;
    }
}

const getMagaByIdWeb = async (id) => {
    try {
        return await mangaService.getMagaByIdWeb(id);
    } catch (error) {
        throw error;
    }
}

// danh cho mobile
const getMagaByIdMobile = async (id) => {
    try {
        return await mangaService.getMagaByIdMobile(id);
    } catch (error) {
        throw error;
    }
}

const getMangaByCategory = async (category) => {
    try {
        return await mangaService.getMangaByCategory(category);
    } catch (error) {
        throw error;
    }
}
const getMangaByCategoryNotEqualHot = async () => {
    try {
        return await mangaService.getMangaByCategoryNotEqualHot();
    } catch (error) {
        throw error;
    }
}
const updateMangaById = async (id, title, author, image, describe, reader, liked, category) => {
    try {
        return await mangaService.updateMangaById(id, title, author, image, describe, reader, liked, category)
    } catch (error) {
        console.log('Update manga error: ',error);
    }
}
const getMangaByQuery = async (keywords) => {
    try {
        return await mangaService.getMangaByQuery(keywords);
    } catch (error) {
        throw error;
    }
}

const likes = async (idUser, idStory) => {
    try {
        return await mangaService.likes(idUser, idStory);
    } catch (error) {
        throw error;
    }
}

const reader = async (idUser, idStory) => {
    try {
        return await mangaService.reader(idUser, idStory);
    } catch (error) {
        throw error;
    }
}

module.exports = { 
    getAllManga, 
    getDexuatManga,
    getMagaByIdWeb,
    getMagaByIdMobile,
    getMangaByQuery,
    deleteManga, 
    addNewManga, 
    updateMangaById,
    getAllMangaBasic,
    getMangaByCategory,
    getMangaByCategoryNotEqualHot,
    likes,
    reader
}