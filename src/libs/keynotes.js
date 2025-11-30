import {loadJSONFile, loadMarkdown} from "./utility";
import math from 'remark-math';
import htmlKatex from 'remark-html-katex';
import html from 'remark-html';
import remark from "remark";
import {getOpeningConferenceChair} from "./conference_opening_chairs";

export const getAllSpeakers = () => {
  return loadJSONFile("speakers.json");
};


export const getAllSpeakersSlugs = () => {
  return loadJSONFile("speakers.json").map(speaker => speaker.slug);
};


export const getSpeaker = ({slug}) => {
  return getAllSpeakers()
    .filter(speaker => speaker.slug === slug)[0];
};


export const getLectureData = (authorSlug) => {
  const {data} = loadMarkdown(authorSlug, 'plenary');
  return data;
};


export const getPlenarySchedule = (part = 0) => {
  const plenary = loadJSONFile("plenary.json")[part];
  plenary.parts = plenary.parts.map(part => {
    const newPart = {...part};
    if (newPart.chairs) {
      newPart.chairs = newPart.chairs.map(chair => {
        return getOpeningConferenceChair(chair);
      })
    }

    if (part.lectures) {
      newPart.lectures = part.lectures.map(lecture => {
        // Copy lecture and load speaker:
        const newLecture = {...lecture};
        newLecture.speaker = getSpeaker(lecture.speaker);

        // Attach lecture title:
        newLecture.data = getLectureData(lecture.speaker.slug);
        // Return the updated lecture
        return newLecture;
      });
    }
    return newPart;
  });

  return plenary;
};


export const getKeynote = async (authorSlug) => {
  const plenary = loadMarkdown(authorSlug, 'plenary');
  const speakerBio = loadMarkdown(authorSlug, 'speakers');
  const speaker = getSpeaker({slug: authorSlug});
  const coauthor = speaker.coauthor || null;
  // TODO add plenary schedule
  //const schedule = loadJSONFile("plenary.json");
  const schedule = {};
  let lecture = {};

  // Find the lecture:
  // for (const part of schedule.parts) {
  //   const filteredLectures = part.lectures ? part.lectures.filter(l => l.speaker.slug === authorSlug) : [];
  //   if (filteredLectures.length > 0) {
  //     lecture = filteredLectures[0];
  //   }
  // }

  // Parse plenary talk markdown to HTML:
  const plenaryContentHtml = await remark()
    .use(math)
    .use(htmlKatex)
    .use(html)
    .process(plenary.content);

  // Parse speaker bio
  const bioContentHtml = await remark()
    .use(html)
    .process(speakerBio.content);


  return {
    title: plenary.data.title,
    abstract: plenaryContentHtml.contents,
    bio: bioContentHtml.contents,
    coauthor,
    speaker,
    lecture
  }
};
