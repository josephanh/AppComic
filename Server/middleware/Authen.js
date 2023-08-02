var jwt = require('jsonwebtoken');
console.log('Bắt dầu');
const authenWeb = (req, res, next) => {
    const { session } = req;
    const token = req.cookies.access_token;
    const url = req.originalUrl.toLowerCase();
    // console.log(token);
    if (!token) {
        if (url.includes('login')) {
            next();
        } else {
            res.redirect('/login');
        }
    } else {
        if (!token) {
            if (url.includes('login')) {

                next();
            } else {
                res.redirect('/login');
            }
        } else {
            // console.log(token);
            // const data = jwt.verify(token, "secret");
            jwt.verify(token, 'secret', function (error, decoded) {
                if (error) {
                    if (url.includes('login')) {
                        next();
                    } else {
                        res.redirect('/login');
                    }
                } else {
                    if (url.includes('login')) {
                        res.redirect('/');
                    } else {
                        const { role } = decoded;
                        if (role < 100) {
                            req.session.destroy();
                            return res.redirect('/login');
                        }
                        next();

                    }
                }
            })
        }
    }
}


const authenApp = (req, res, next) => {
    let token = null;
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] == 'Bearer')
        token = req.headers.authorization.split(' ')[1];
    if (token) {
        jwt.verify(token, 'secret', function (error, decoded) {
            if (error) {
                return res.status(401).json({ status: false })
            } else {
                return next();
            }
        })
    } else {
        return res.status(401).json({ status: false })
    }
}

module.exports = { authenWeb, authenApp }