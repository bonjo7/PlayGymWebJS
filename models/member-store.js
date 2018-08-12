'use strict';

const _ = require('lodash');

const memberStore = {

  memberCollection: require('./member-store.json').memberCollection,

  getAllMembers() {
    return this.memberCollection;
  },

  getMember(id) {
    return _.find(this.memberCollection, { id: id });
  },
  
  removeAssessment(id, assessmentId) {
    const member = this.getMember(id);
    _.remove(member.assessments, { id: assessmentId });
  },
  
};

module.exports = memberStore;