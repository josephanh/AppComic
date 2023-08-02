// bắt lỗi
// bắt lỗi đăng kí
const checkRegister = async (req, res, next) => {
    try {
        const { email, password, name, confirm_pass } = req.body;
        if (!email || !password || !name || !confirm_pass) {
            return res.status(400).json({
                result: false,
                message: "Vui lòng nhập đầy đủ"
            })
        } else {
            if (password.toString() != confirm_pass.toString()) {
                return res.status(400).json({
                    result: false,
                    message: "Mật khẩu không khớp"
                })
            }

            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    result: false,
                    message: "Email không hợp lệ"
                })
            }
            // chạy tiếp
            next();
        }

    } catch (e) {
        console.log(e);
        return res.status(400).json({ result: false, status: 400 });
    }
}

module.exports = { checkRegister }