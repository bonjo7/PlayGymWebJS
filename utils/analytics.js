'use strict';

const accounts = require ('../controllers/accounts.js');
const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const memberStore = require('../models/member-store');
const uuid = require('uuid');

const analytics = {
  index(request, response) {
    
    const loggedInUser = accounts.getCurrentMember(request);
    const viewData = {
      
      member: memberStore.getMemberById(loggedInUser.id),
      assessments: assessmentStore.getMemberAssessments(loggedInUser.id),
    };
    
  },
  
  calculateBMI(member, assessments){
    
    const latestBmi = 0;
    
    if(assessments.length == 0){
      latestBmi = (member.startWeight / (member.height * member.height))
    }
    else{
      assessments = assessments.length - 1;
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
    },
};


module.exports = analytics;