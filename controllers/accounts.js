'use strict';

const memberstore = require('../models/member-store');
const trainerstore = require('../models/trainer-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('assessment', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  /*
  * Create a new member
  * Add the member to the memberstore
  * Using the member store add member method
  */
  register(request, response) {
    const member = request.body;
    
    member.id = uuid();
    member.gender = request.body.gender,
    member.email = request.body.email,
    member.password = request.body.password,
    member.address = request.body.address,
    member.height = request.body.height,
    member.startweight = request.body.startweight,
    
    memberstore.addMember(member);
    //Log the email of the new member
    logger.info(`registering ${member.email}`);
    response.redirect('/');
  },

  /*
  * Only allow registered members/trainers to access the app
  * If member/trainer exists login if not return login page
  */
  authenticate(request, response) {
    // Member/Trainer variables and get relevant values
    const member = memberstore.getMemberByEmail(request.body.email);
    const memberPassword = memberstore.getMemberByPassword(request.body.password);
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    const trainerPassword = trainerstore.getTrainerByPassword(request.body.password);
    //If else statement to ensure registered members/trainers can access
    //Ensure email and password exist 
    if (member && memberPassword) {
      response.cookie('assessment', member.email);
      //Log member email
      logger.info(`logging in ${member.email}`);
      response.redirect('/dashboard');
    }
    else if (trainer && trainerPassword) {
      response.cookie('assessment', trainer.email);
      //log trainer email
      logger.info(`logging in ${trainer.email}`);
      response.redirect('trainerdash');
    }else {
      response.redirect('/login');
    }
  },

  getCurrentMember(request) {
    const memberEmail = request.cookies.assessment;
    return memberstore.getMemberByEmail(memberEmail);
  },
  
  getCurrentTrainer(request) {
    const trainerEmail = request.cookies.assessment;
    return trainerstore.getTrainerByEmail(trainerEmail);
  },
};

module.exports = accounts;
