'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const memberStore = require('../models/member-store');
const goalStore = require('../models/goal-store');
const analytics = require('../utils/analytics');
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    logger.info('Member dashboard rendering');
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      title: 'Member Dashboard',
      assessments: assessmentStore.getMemberAssessments(loggedInMember.id),
      member: memberStore.getMemberById(loggedInMember.id),
      //calculateBmi: analytics.calculateBMI(),
      bmiCategory: analytics.determineBMICategory(loggedInMember.id),
    };
    logger.info('about to render', assessmentStore.getAllAssessments());
    response.render('dashboard', viewData);
  },

  /**
  * Delete Assessment method
  * Get the memberId and assessmentId associated with the member
  * Delete the assessment using the assessment-store removeAssessment method
  * Once deleted redirect back to the dashboard
  **/
  deleteAssessment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.id;
    //Log message displaying the assessmentId and the memberId
    logger.debug(`Deleting Assessment ${assessmentId} from Member ${memberId}`);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect('/dashboard');
  },

  /**
  * Add Assessment method
  * Get the logged in member using the accounts getCurrentMmeber method
  * Create a new assessment Object
  * Then add it to the assessment store array
  * Redirect the member to the dashboard
  **/
  addAssessment(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const newAssessment = {
      id: uuid(),
      memberid: loggedInMember.id,
      date: new Date().toUTCString(),
      weigth: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      waist: request.body.waist,
      hips: request.body.hips,
    
    };
    //Log the new assessment details
    logger.debug('Creating a new Assessment', newAssessment);
    assessmentStore.addAssessment(newAssessment);
    response.redirect('/dashboard');
  },
  
  addGoal(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const newGoal = {
      id: uuid(),
      memberid: loggedInMember.id,
      date: request.body.date,
      measurement: request.body.measurement,
    };
    //Log the new assessment details
    logger.debug('Creating a new Goal', newGoal);
    goalStore.addGoal(newGoal);
    response.redirect('/dashboard');
  },
  
};

module.exports = dashboard;
