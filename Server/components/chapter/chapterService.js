const mangaModel = require("../manga/mangaModel");
const chapterModel = require("./chapterModel")

const getChapterOfStory = async (id) => {
    try {
        let chapters = await chapterModel.findById(id)
            .populate('chapters')
            .populate('category');;
        return chapters;
    } catch (error) {
        throw error;
    }
}
// them mot document chapter de them vao story
const addNewChapter = async (title, content, chapter_index) => {
    try {
        const chapter = {
            title,
            content,
            chapter_index,
            date_created: Date.now(),
            date_update: Date.now()
        }
        const newChapters = await chapterModel.create(chapter);
        return newChapters;
    } catch (error) {
        console.log(error);
        return false;
    }
}
const deleteChapter = async (id) => {
    try {
        console.log(id);
        const result = await chapterModel.findByIdAndDelete(id);
        console.log(result);
        return result;
    } catch (error) {
        console.log("delete chapter service", error);
    }
}
const updateChapter = async (id, title, chapter_index, content) => {
    try {
        const chapter = await chapterModel.findOne({_id: id, chapter_index: chapter_index});
        if (chapter) {
            chapter.title = title ? title : chapter.title;
            chapter.chapter_index = chapter_index ? chapter_index : chapter.chapter_index;
            chapter.content = content ? content : chapter.content;
            chapter.date_update = Date.now();
            chapter.save();
            return chapter;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getDetailChapter = async (id) => {
    try {
        let chapters = await chapterModel.findById(id)
            .populate('category');;
        return chapters;
    } catch (error) {
        throw error;
    }
}

// cap nhat detailChapter trong chapters
// const addNewChapterOfStory = async (id, title, numberChapter, content) => {
//     // console.log(id, title, numberChapter, content);
//     try {
//         let chapter = await chapterModel.findById(id);

//         if (chapter) {
//             let detailChapter = chapter.detailChapter;
//             const newChapterOfDetail = {
//                 title: title ? title : "No title",
//                 numberChapter: numberChapter ? numberChapter : detailChapter.length + 1,
//                 content: content ? content : "No content",
//             }
//             detailChapter.push(newChapterOfDetail);
//             chapter.detailChapter = detailChapter;
//             await chapter.save();
//             return true;
//         }
//         return false;
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }

// thêm một chapter vào detailChapter
const addNewChapterOfStory = async (id, title, numberChapter, content) => {
    // console.log(id, title, numberChapter, content);
    try {
        const result = chapterModel.updateOne(
            { _id: id, 'detailChapter.numberChapter': { $ne: numberChapter } },
            { $push: { detailChapter: { title, numberChapter, content } } }
        )
        console.log(result);
        return result;
    } catch (error) {

    }
}


module.exports = {
    getChapterOfStory,
    addNewChapter,
    deleteChapter,
    updateChapter,

    addNewChapterOfStory,
    getDetailChapter,
}