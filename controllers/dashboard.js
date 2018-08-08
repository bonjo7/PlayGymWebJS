'use strict';

const logger = require('../utils/logger');

const memberCollection = require('../models/assessment-store.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'PlayGym Dashboard',
      member: memberCollection,
    };
    response.render('dashboard', viewData);
  },
};

module.exports = dashboard;
