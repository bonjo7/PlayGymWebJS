'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const memberStore = require('../models/member-store');
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    logger.info('Member dashboard rendering');
    const loggedInUser = accounts.getCurrentMember(request);
    const viewData = {
      title: 'Member Dashboard',
      assessments: assessmentStore.getMemberAssessments(loggedInUser.id),
      member: memberStore.getMemberById(loggedInUser.id),
    };
    logger.info('about to render', assessmentStore.getAllAssessments());
    response.render('dashboard', viewData);
  },

  deleteAssessment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.id;
    logger.debug(`Deleting Assessment ${assessmentId} from Member ${memberId}`);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect('/dashboard');
  },

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
    logger.debug('Creating a new Assessment', newAssessment);
    assessmentStore.addAssessment(newAssessment);
    response.redirect('/dashboard');
  },
  
  calculateBMI(id){
    const member = this.getMemberById(id);
    const latestBmi = 0;
    const assessments = this.getAssessment(id);
    
    if(assessments.length == 0){
      latestBmi = (member.startWeigth / (member.height * member.height))
    }
    else{
      assessments = assessments.lenght - 1;
      latestBmi = (assessments.weight / (assessments.height * assessments.height))
    }
    
    return latestBmi;
  },
  
  determineBMICategory(latestBmi){

        if(latestBmi < 16 ){
            return "SEVERELY UNDERWEIGHT";
        }
        else if(latestBmi >= 16 && latestBmi < 18.5){
            return "UNDERWEIGHT";
        }
        else if(latestBmi >= 18.5 && latestBmi < 25) {
            return "NORMAL";
        }
        else if(latestBmi >= 25 && latestBmi < 30) {
            return "OVERWEIGHT";
        }
        else if(latestBmi >= 30 && latestBmi < 35) {
            return "MODERATELY OBESE";
        }
        else if(latestBmi >= 35) {
            return "SEVERELY OBESE";
        }

        return "No value for BMI";
    }
};

module.exports = dashboard;
