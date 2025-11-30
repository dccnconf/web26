import {loadJSONFile} from "./utility";

const getAllTracks = () => {
  const tracks =  loadJSONFile('tracks.json');
  tracks.sort((lside, rside) => lside.order < rside.order);
  return tracks;
};

export default getAllTracks;
