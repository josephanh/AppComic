const { model } = require('mongoose');
const chapterService = require('./chapterService')
const mangaService = require('../manga/mangaService');
const mangaModel = require('../manga/mangaModel');

const getChapterOfStory = async (id) => {
    try {
        return await chapterService.getChapterOfStory(id);
    } catch (error) {
        throw error;
    }
}

// phần này là của manga -- tao moi mot chapter
// chapter nay de them vo phan chapter trong story
const addNewChapter = async (id, title, content, chapter_index) => {
    try {
        // const check
        const chapterNew = await chapterService.addNewChapter(title, content, chapter_index);
        var result = false;
        if (chapterNew) {
            result = mangaModel.updateOne(
                { _id: id },
                { $push: { chapters: { _id: chapterNew._id } } }
            )
        }
        // console.log("ketqua: ",result);
        return result;
    } catch (error) {
        return false;
        throw error;
    }
}
const deleteChapter = async (id) => {
    try {
        return chapterService.deleteChapter(id);
    } catch (error) {
        throw error;
    }
}
const updateChapter = async (id, title, chapter_index, content) => {
    try {
        const updateChapter = await chapterService.updateChapter(id, title, chapter_index, content);
        if (updateChapter != null) {
            return updateChapter;
        }
        return false;
    } catch (error) {
        throw error;
    }
}

// thêm một chapter vào story
// them mot chapter vao phan chapter trong story
// dung push();
// const addNewChapterOfStory = async (id, title, numberChapter, content) => {
//     try {
//         const indexChapter = await chapterService.checkChapterExist(id, numberChapter);
//         if (!indexChapter) {
//             console.log(indexChapter);
//             const chapter = await chapterService.addNewChapterOfStory(id, title, numberChapter, content);
//             console.log(chapter);
//             return chapter;
//         }
//         return false;
//     } catch (error) {
//         return false;
//         throw error;
//     }
// }


const addNewChapterOfStory = async (id, title, numberChapter, content) => {
    try {
        return await chapterService.addNewChapterOfStory(id, title, numberChapter, content);
    } catch (error) {
        throw error;
    }
}



module.exports = {
    getChapterOfStory,
    addNewChapter,
    deleteChapter,
    updateChapter,

    addNewChapterOfStory,
    // addNewChapters
}