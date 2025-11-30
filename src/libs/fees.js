import {loadJSONFile} from "./utility";

export const getAllFees = () => {
  return loadJSONFile("fees.json");
}
