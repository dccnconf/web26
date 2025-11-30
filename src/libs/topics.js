import {loadJSONFile} from "./utility";

const getTopics = () => {
  return loadJSONFile('topics.json').sort();
};

export default getTopics;
