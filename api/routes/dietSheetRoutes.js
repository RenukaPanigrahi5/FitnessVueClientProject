const express = require('express');
const router = express.Router();
const DietSheetController = require('../controllers/dietSheetController');

router.post('/addNewDiet', DietSheetController.addNewDiets);
router.get('/getDietByCategory', DietSheetController.getDietByCategory);

module.exports = router;