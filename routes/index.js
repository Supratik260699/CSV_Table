const express = require('express');
const mainController = require('../controller/mainController');
const router = express.Router();

router.get('/',mainController.home);

router.post('/upload',mainController.upload);

router.get('/view/:id',mainController.view);

router.get('/del/:id',mainController.delete);

router.post('/uploadAPI',mainController.uploadthAPI);

module.exports = router;