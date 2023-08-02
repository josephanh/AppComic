var express = require('express');
var router = express.Router();
const mangaController = require('../../components/manga/mangaController');
const categoryController = require('../../components/category/categoryController')
const chapterController = require('../../components/chapter/chapterController');

const middleWare = require('../../middleware/uploadFile');
const uploadFile = require('../../middleware/uploadFile');
const CONFIG = require('../../config/config');
const auth = require('../../middleware/Authen');
const { ref, getDownloadURL, uploadBytesResumable, getStorage, deleteObject } = require('firebase/storage');

// hiện thị bảng sản phẩm
// http://localhost:3000/cpanel/manga/data-table
router.get('/data-table', [auth.authenWeb], async function (req, res, next) {
    const result = await mangaController.getAllManga();
    // console.log(resuflt);
    // hiển thị trang bảng dữ liệu
    res.render('manga/data-table', { data: result })
})

// xử lí xóa manga
// http://localhost:3000/cpanel/manga/:id/delete
router.get('/:id/delete/:idchapter/:nameImage', [auth.authenWeb], async function (req, res, next) {
    try {
        const { id, idchapter, nameImage } = req.params;
        // console.log(id, idchapter, nameImage);
        const storage = getStorage();
        const desertRef = ref(storage, `${nameImage}`);
        // console.log(desertRef);
        deleteObject(desertRef).then(() => {
            // File deleted successfully
            console.log('File deleted successfully');
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log('Uh-oh, an error occurred!', error);
        });
        await chapterController.deleteChapter(idchapter);

        await mangaController.deleteManga(id);

        res.json({ status: true })
    } catch (error) {
        console.log(error);
        res.json({ status: false })
    }
})
// hiện thị trang thêm mới manga
// http://localhost:3000/cpanel/manga/form/form-editer
router.get('/form/form-editer', [auth.authenWeb], async function (req, res, next) {
    const categories = await categoryController.getAllCategory();
    // console.log(categories);
    // hiển thị trang bảng thêm dữ liệu dữ liệu
    res.render('manga/form-editer', { categories })
})

// xử lí thêm mới
router.post('/form-edit/new', [auth.authenWeb, uploadFile.single('image')], async function (req, res, next) {
    try {
        let { body, file } = req;
        if (file) {
            const date = Date.now();
            const fileName = `image---${date}`;
            const storage = getStorage();
            const storageRef = ref(storage, fileName);
            const metadata = {
                contentType: file.mimetype,
            }
            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
            const downloadUrlImage = await getDownloadURL(snapshot.ref)
            console.log(downloadUrlImage);
            body = { ...body, image: { name: fileName, url: downloadUrlImage } }
        }
        const { title, author, describe, image, category } = body;
        // console.log(title, author, describe, image, category);
        await mangaController.addNewManga(title, author, describe, image, category);
        res.redirect('/cpanel/manga/data-table')
    } catch (error) {
        console.log('addnew ', error);
    }
})

// hiện thị trang update manga 
router.get('/:id/detailmanga/edit', [auth.authenWeb], async function (req, res, next) {
    const { id } = req.params;
    const categories = await categoryController.getAllCategory();
    const manga = await mangaController.getMagaByIdWeb(id);
    
    const chapters = manga.chapters;

    console.log(chapters);
    for (let i = 0; i < categories.length; i++) {
        categories[i].selected = false;
        if (categories[i]._id.toString() == manga.category._id.toString()) {
            categories[i].selected = true;
            // console.log("catergory: ",categories[i]);
        }
    }
    res.render('manga/detailManga', { manga, categories, chapters });
})
// xu li cap nhat manga
router.post('/:id/detailmanga/edit', [auth.authenWeb, uploadFile.single('image')], async function (req, res, next) {
    try {
        let { id } = req.params;
        let { body, file } = req;
        if (file) {
            const date = Date.now();
            const fileName = `image---${date}`;
            const storage = getStorage();
            const storageRef = ref(storage, fileName);
            const metadata = {
                contentType: file.mimetype,
            }
            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
            const downloadUrlImage = await getDownloadURL(snapshot.ref)
            // console.log(downloadUrlImage);
            body = { ...body, image: { name: fileName, url: downloadUrlImage } }
            let image = await mangaController.getMagaByIdWeb(id);
            const desertRef = ref(storage, `${image.image.name}`);
            deleteObject(desertRef).then(() => {
                // File deleted successfully
                console.log('File deleted successfully');
            }).catch((error) => {
                // Uh-oh, an error occurred!
                console.log('Uh-oh, an error occurred!', error);
            });
        }

        const { title, author, describe, image, category, reader, liked, } = body;
        const isUpdate = await mangaController.updateMangaById(id, title, author, image, describe, reader, liked, category);

        res.redirect('/cpanel/manga/data-table')
    } catch (error) {
        console.log('addnew ', error);
    }
})

// thêm một chapter mới trong chapters
router.post('/add/chapter/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const url = req.originalUrl.toLowerCase();
        const {title, chapter_index, content} = req.body;
        console.log(id, title, chapter_index, content);
        const chapter =  await chapterController.addNewChapter(id, title, content, chapter_index);
        return res.redirect(`/cpanel/manga/${id}/detailmanga/edit#chapter-form-scroll`);
    } catch (error) {
        console.log(error);
    }
})

// update một chapter 
router.post('/update/chapter/:idstory/:idchapter', async (req, res, next) => {
    try {
        const {idstory, idchapter} = req.params;
        const {title, chapter_index, content} = req.body;
        // console.log(idchapter, title, chapter_index, content, idstory);
        const result = await chapterController.updateChapter(idchapter, title, chapter_index, content);
        console.log(result);
        return res.redirect(`/cpanel/manga/${idstory}/detailmanga/edit`);
    } catch (error) {
        console.log(error);
        return res.status(400).json({})
    }
})








// service demo chapter
router.get('/add/chapter', async (req, res, next) => {
    try {
        const result = await chapterController.addNewChapter();
        return res.status(200).json({ result: result });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false });
    }
})

// test



module.exports = router;