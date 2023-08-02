const categoryModel = require("../category/categoryModel");
const mangaModel = require("./mangaModel");


const getAllManga = async () => {
    try {
        // console.log("Tới đây rồi trước khi");
        var result = await mangaModel
            .find()
            .populate('chapters')
            .populate('category');
        // console.log("Tới đây rồi ",result);  
        return result;
    } catch (error) {
        console.log('getAllNews', error);
        throw error;
    }

}

const getDexuatManga = async () => {
    try {
        // console.log("Tới đây rồi trước khi");
        var result = await mangaModel
            .find()
            .populate('chapters')
            .populate('category')
            .limit(9);
        // console.log("Tới đây rồi ",result);  
        return result;
    } catch (error) {
        console.log('getAllNews', error);
        throw error;
    }
}

const getAllMangaBasic = async () => {
    try {
        // console.log("Tới đây rồi trước khi");
        var result = await mangaModel
            .find()
            .populate('category');
        // console.log("Tới đây rồi ",result);  
        return result;
    } catch (error) {
        console.log('getAllNews', error);
        throw error;
    }

}
const getMangaByQuery = async (keywords) => {
    try {
        let idCategory = await categoryModel.find({ title: { $regex: keywords, $options: 'i' } });
        let query = {
            $or: [{ title: { $regex: keywords, $options: 'i' } },
            { 'category': { $regex: idCategory.length > 0 ? idCategory[0]._id : "", $options: 'i' } }]
        }
        const result = await mangaModel
            .find(query)
            .populate('category');
        return result;
    } catch (error) {
        console.log('get Manga by query: ', error);
        return null;
    }
}

const getMagaByIdMobile = async (id) => {
    try {
        let manga = await mangaModel
            .findOne({ _id: id })
            .populate('category');
        return manga;
    } catch (e) {
        console.log('getMangaByIdMobile', e);
    }
}

const getMagaByIdWeb = async (id) => {
    try {
        let manga = await mangaModel
            .findOne({ _id: id })
            .populate('category')
            .populate('chapters')
            .populate('reader', "name")
            .populate('liked', "name");
        // pupulate đọc theo trường trong model
        // manga.chapter.totalChapter = manga.chapter.detailChapter.length;
        return manga;
    } catch (e) {
        console.log('getMangaById', e);
        return null;
    }
}

const getMangaByCategory = async (category) => {
    try {
        let idCategory = await categoryModel.find({ title: { $regex: category, $options: 'i' } });
        let query = {
            category: { $regex: idCategory.length > 0 ? idCategory[0]._id : "", $options: 'i' }
        }
        const result = await mangaModel
            .find(query)
            .populate('category');
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}


const getMangaByCategoryNotEqualHot = async () => {
    try {
        let idCategory = await categoryModel.find({ title: { $regex: "Hot", $options: 'i' } });
        let query = {
            category: { $ne: idCategory.length > 0 ? idCategory[0]._id : "" }
        }
        const result = await mangaModel
            .find(query)
            .populate('category');
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const addNewManga = async (title, author, describe, image, category) => {
    try {
        const manga = {
            title,
            author,
            image,
            describe,
            liked: 0,
            reader: 0,
            category,
            chapter: [],
            dateCreated: Date.parse(new Date()),
        }
        await mangaModel.create(manga)
    } catch (error) {
        console.log('add-new-manga', error);
    }
}

const deteteMangabyId = async (id) => {
    try {
        return await mangaModel.findByIdAndDelete(id);
    } catch (error) {
        console.log('detetebyId', error);
    }
}

const likes = async (idUser, idStory) => {
    try {
        // id is _id of user
        console.log(idUser, idStory);
        const user = await mangaModel.findOne(
            { _id: idStory, liked: idUser },
        )
        // console.log(user);
        // console.log(user == null);
        if (user) {
            const remove = await mangaModel.findOneAndUpdate(
                { _id: idStory },
                { $pull: { liked: idUser } }
            )
            return true;
        } else {
            const add = await mangaModel.findOneAndUpdate(
                { _id: idStory },
                { $push: { liked: idUser } }
            )
            if (add) return true;
            return false;

        }
        return false;
    } catch (error) {
        console.log("likes: ", error);
        return false;
    }
}

const reader = async (idUser, idStory) => {
    try {
        console.log(idUser, idStory);
        const user = await mangaModel.findOne(
            { _id: idStory, reader: idUser },
        )
        if (user) {
            return true;
        } else {
            const add = await mangaModel.findOneAndUpdate(
                { _id: idStory },
                { $push: { reader: idUser } }
            )
            if (add) return true;
            return false;

        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateMangaById = async (id, title, author, image, describe, reader, liked, category) => {
    try {
        // console.log(image);
        let item = await mangaModel.findById(id);
        // console.log(item.title); 
        if (item) {
            item.title = title ? title : item.title;
            item.author = author ? author : item.author;
            item.image = image ? image : item.image;
            item.describe = describe ? describe : item.describe;
            item.reader = Number(reader) ? Number(reader) : item.reader;
            item.liked = Number(liked) ? Number(liked) : item.liked;
            item.category = category ? category : item.category;
            await item.save();
            // console.log(true);
            return true;
        }
        // console.log(false);
        return false;
    } catch (error) {
        console.log(false);
        return false;
    }
}

module.exports = {
    getAllManga,
    getMangaByQuery,
    addNewManga,
    deteteMangabyId,
    getMagaByIdMobile,
    getMagaByIdWeb,
    updateMangaById,
    getAllMangaBasic,
    getMangaByCategory,
    getMangaByCategoryNotEqualHot,
    likes,
    reader,
    getDexuatManga
}
