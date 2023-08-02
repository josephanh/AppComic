var express = require('express');
var router = express.Router();
const userController = require('../../components/user/userController');
const validation = require('../../middleware/Validation');
const authen = require('../../middleware/Authen');
var jwt = require('jsonwebtoken')
// http://localhost:3000/api/user
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await userController.login(email, password);
        if (result) {
            const token = jwt.sign({result}, 'secret',
            {expiresIn: '1h'})
            return res.status(200).json({ result: true, user: result, token: token });
        }
        return res.status(400).json({ result: false, user: null })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false });
    }
})

router.post('/register', [validation.checkRegister], async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const result = await userController.register(email, password, name);
        return res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        return res.status(400).json({result: false});
    }
})

router.post('/bookmark/:idUser/:idStory', async (req, res, next) => {
    try {
        const {idStory, idUser} = req.params;
        const result = await userController.bookmark(idUser, idStory);
        // console.log(result);
        if(result) {
            return  res.status(200).json({result});
        }
        return res.status(400).json({})
    } catch (error) {
        console.log("bookmark manga API: ", error);
        return res.status(400).json({});
    }
} )
router.get('/getbookmark/:idUser', async (req, res, next) => {
    try {
        const {idUser} = req.params;
        const result = await userController.getBookmark(idUser);
        if(result) {
            return  res.status(200).json({result});
        }
        return res.status(400).json({})
    } catch (error) {
        console.log(error);
        return res.status(444).json({})
    }
})
module.exports = router;