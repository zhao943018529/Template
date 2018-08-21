const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'photos/upload' });

router.post('/editor', upload.single('image'), function (req, res) {
    let result = {
        status: 200,
        data: {
            filename: req.file.filename,
            url: '/' + req.file.path,
        }
    }
    res.json(result);
});

module.exports = router;