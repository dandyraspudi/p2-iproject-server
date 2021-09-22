const axios = require("axios");
const formData = require("form-data");

const imageKit = async (req, res, next) => {
    try {
        if (!req.file) {
            if (req.body.imageUrl_headline === 'undefined' && req.body.imageUrl_content === 'undefined') {
                req.body.imageUrl = undefined
            }
            next()
        } else if (req.file.size <= 555000 && (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png')) {
            const newForm = new formData();
            const encodedFile = req.file.buffer.toString("base64");
            newForm.append("file", encodedFile);
            newForm.append("fileName", req.file.originalname);
            const encodedKey = Buffer.from(process.env.imageKitPrivate + ":").toString("base64");

            const result = await axios({
                method: "POST",
                url: "https://upload.imagekit.io/api/v1/files/upload",
                data: newForm,
                headers: {
                    ...newForm.getHeaders(),
                    Authorization: `Basic ${encodedKey}`
                }
            })


            if (result) {
                req.body.imageUrl_headline = result.data.url
                req.body.imageUrl_content = result.data.url
                next()
            } else {
                next({
                    name: "NotFound"
                })
            }
        } else {
            throw ({
                name: "imageError",
                message: 'image format is wrong / image size is too large'
            })
        }

    } catch (err) {
        next(err)
    }

}

module.exports = imageKit