const express = require('express');
const overviewController = require('../../controllers/overview.controller');

const router = express.Router();

router.route('/overviewUser').get(overviewController.getOverviewUser);
router.route('/overviewDashBoard').get(overviewController.getDashboardAdmin);
router.route('/testMail').post(overviewController.testMail);
router.route('/testTransfer').post(overviewController.testTransfer);

module.exports = router;
