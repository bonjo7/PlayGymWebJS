'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'Dashboard',
      member: memberStore.getAllMembers(),
    };
    logger.info('about to render', memberStore.getAllMembers());
    response.render('dashboard', viewData);
  },
};


module.exports = dashboard;
