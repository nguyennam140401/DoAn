const express = require('express');
const overviewController = require('../../controllers/overview.controller');

const router = express.Router();

router.route('/overviewUser').get(overviewController.getOverviewUser);

module.exports = router;
