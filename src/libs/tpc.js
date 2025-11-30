import {loadJSONFile} from "./utility";
import {getOrganization} from "./organizations";


export const getAllTpcMembers = () => {
  return loadJSONFile('tpc.json')
    .map(member => {
      // 1) Extract first and last name to sort afterwards
      let delimIndex = member.name.lastIndexOf('.');
      if (delimIndex < 0) {
        delimIndex = member.name.lastIndexOf(' ');
      }
      const _firstName = member.name.substring(0, delimIndex);
      const _lastName = member.name.substring(delimIndex + 1, member.name.length);

      // 2) Get member organizations
      const affiliations = member.affiliations.map(getOrganization);

      if (affiliations.indexOf(undefined) >= 0) {
        console.log('!!!!! member has broken affiliation: ', member);
      }

      // 3) Extract countries
      const countries = [];
      for (const aff of affiliations) {
        if (countries.indexOf(aff.country) < 0) {
          countries.push(aff.country);
        }
      }

      // 4) Return updated member
      return {
        ...member,
        _firstName,
        _lastName,
        affiliations,
        countries
      };
    })
    .sort((a, b) => {
      if (!a.chair && !b.chair)
        return compareNames(a, b);
      if (a.chair && !b.chair)
        return -1;
      if (!a.chair && b.chair)
        return 1;
      return a.chair.order < b.chair.order ? -1 : a.chair.order === b.chair.order ? 0 : 1;
    });
}


const compareNames = (a, b) => {
  if (a._lastName < b._lastName) {
    return -1;
  }
  else if (a._lastName === b._lastName) {
    if (a._firstName < b._firstName) {
      return -1;
    }
    else if (a._firstName === b._firstName) {
      return 0;
    }
    else return 1;
  }
  else return 1;
}
