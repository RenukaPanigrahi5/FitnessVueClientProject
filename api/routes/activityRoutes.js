const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/activityController');
const ActivityLogController = require('../controllers/activityLogController');

router.post('/addActivities', ActivityController.newActivity);
router.get('/getActivityInfo', ActivityController.getActivityInfoByEmail);


router.post('/addActivitiyLog', ActivityLogController.newActivityLog);
router.get('/getActivityLogInfo', ActivityLogController.getActivityInfoByEmail);

module.exports = router;