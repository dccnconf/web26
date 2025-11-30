import {loadJSONFile} from "./utility";
import getAllTracks from "./tracks";
import {getPaper} from "./common/papers";

export const loadProgram = async ({ noPaperFetch = false } = {}) => {
  const program = loadJSONFile("program.json");
  const tracks = getAllTracks();

  // Copy sessions into days.intervals:
  for (const pd of program.days) {
    for (const interval of pd.intervals) {
      if (interval.sessions === undefined || interval.sessions.length === 0)
        continue;
      const slugs = interval.sessions.map(s => s.slug);
      interval.sessions = program.sessions.filter(s => slugs.indexOf(s.slug) >= 0);

      // Add 'interval' object to each session, containing "startTime", "endTime" and "type"
      for (const session of interval.sessions) {
        session.interval = {
          startTime: interval.startTime,
          endTime: interval.endTime,
          type: interval.type,
        }
      }

      // Also add 'day' with 'date' and 'online' blocks to sessions:
      for (const session of interval.sessions) {
        session.day = {
          date: pd.date
        };
        if (pd.online !== undefined) {
          session.day.online = pd.online;
        }
      }
    }
  }

  // Fill tracks:
  for (const session of program.sessions) {
    if (session.track !== undefined) {
      session.track = tracks.filter(track => track.slug === session.track.slug)[0];
    }
  }

  // Fill chairs:
  for (const session of program.sessions) {
    session.chairs = session.chairs
      ? session.chairs.map(chair => program.chairs.filter(otherChair => otherChair.slug === chair.slug)[0])
      : [];
  }

  // Fetch papers:
  if (!noPaperFetch) {
    for (const session of program.sessions) {
      if (session.lectures === undefined)
        continue;
      for (const lecture of session.lectures) {
        if (lecture.paperId !== undefined) {
          lecture.paper = await getPaper(lecture.paperId);
        }
      }
    }
  }

  return program;
};
