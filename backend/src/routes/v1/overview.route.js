const express = require('express');
const overviewController = require('../../controllers/overview.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/overviewUser').get(overviewController.getOverviewUser);
router.route('/overviewDashBoard').get(overviewController.getDashboardAdmin);

module.exports = router;
