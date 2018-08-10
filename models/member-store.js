'use strict';

const memberStore = {

  memberCollection: require('./member-store.json').memberCollection,

  getAllMembers() {
    return this.memberCollection;
  },

  getMember(id) {
    let foundMember = null;
    for (let member of this.memberCollection) {
      if (id == member.id) {
        foundMember = member;
      }
    }

    return foundMember;
  },
};

module.exports = memberStore;