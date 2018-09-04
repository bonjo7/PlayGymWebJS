'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const memberStore = require('../models/member-store');

const settings = {
  index(request, response) {
    logger.info('settings rendering');
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      title: 'Settings',
      member: memberStore.getMemberById(loggedInMember.id),
    };
    response.render('settings', viewData);
  },
  
  /*
  * Update member settings
  * Get the current member
  * Update the relevant fields
  * the save the admendants
  * Redirect to the dashboard once complete
  */
  updateSettings(request, response)
  {
    const loggedInMember = accounts.getCurrentMember(request);
    const member = request.body;
    
    loggedInMember.name = member.name,
    loggedInMember.gender = member.gender,
    loggedInMember.email = member.email,
    loggedInMember.password = member.password,
    loggedInMember.address = member.address,
    loggedInMember.height = member.height,
    loggedInMember.startweight = member.startweight,

    memberStore.store.save();
    //Log the member name and email
    logger.info(`updating ${member.name} ${member.email}`);
    response.redirect("/dashboard");
  }
};

module.exports = settings;