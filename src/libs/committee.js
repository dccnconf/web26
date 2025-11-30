import {loadJSONFile} from "./utility";
import {getOrganization} from "./organizations";

export const getAllCommitteeMembers = ({sorted = true} = {}) => {
  const members = loadJSONFile('committee.json');
  if (sorted) {
    members.sort((a, b) => a.order < b.order);
  }
  return members.map(member => {
    const record = {...member};
    record.affiliations = member.affiliations.map(getOrganization);
    return record;
  });
}

export const getCommitteeMember = (slug) => {
  return getAllCommitteeMembers({ sorted: false })
    .filter(item => item.slug === slug)[0];
}
