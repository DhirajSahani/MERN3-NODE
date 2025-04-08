const multer = require('multer')

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        console.log(req,file)

        cb(null, './storage')
    },

    filename: function (req, file, cb) {
        cb(null, "dhiraj-" + file.originalname)
    }
})

module.exports = {
    multer,
    storage
}
