'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store');

const member = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug('Member id = ', memberId);
    const viewData = {
      name: 'Member',
      member: memberStore.getMember(memberId),
    };
    response.render('member', viewData);
  },
};

module.exports = member;