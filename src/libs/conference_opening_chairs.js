import {loadJSONFile} from "./utility";
import {getOrganization} from "./organizations";

export const getAllOpeningChairs = () => {
  return loadJSONFile('conference_opening_chairs.json')
    .map(member => {
      const affiliations = member.affiliations.map(getOrganization);
      return {
        ...member,
        affiliations
      };
    })
}

export const getOpeningConferenceChair = (slug) => {
  const res = getAllOpeningChairs();
  return res.filter(speaker => speaker.slug === slug)[0];
};
