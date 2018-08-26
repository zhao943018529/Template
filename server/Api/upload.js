const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: path.resolve(__dirname, "../..", "static/photos/upload") });

router.post('/editor', upload.single('image'), function (req, res) {
    let url = "/photos/upload/"+req.file.filename;
    let result = {
        status: 200,
        data: {
            filename: req.file.filename,
            url: url,
        },
        message:'upload image successfully',
    }
    res.json(result);
});

module.exports = router;