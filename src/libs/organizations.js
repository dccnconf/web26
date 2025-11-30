import {loadJSONFile} from "./utility";

export const getAllOrganizations = () => {
  return loadJSONFile('organizations.json');
}

export const getOrganization = ({id, slug}) => {
  return getAllOrganizations().filter(item => (
    (!slug || slug === item.slug) && (!id || id === item.id)))[0];
}
