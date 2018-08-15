'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store.js');

const trainerdash = {
  index(request, response) {
    logger.info('trainer dashboard rendering');
    const viewData = {
      title: 'Trainer Dashboard',
      member: memberStore.getAllMembers(),
    };
    logger.info('about to render', memberStore.getAllMembers());
    response.render('trainerdash', viewData);
  },
  
  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member ${memberId}`);
    memberStore.removeMember(memberId);
    response.redirect('/trainerdash');
  },
};

module.exports = trainerdash;