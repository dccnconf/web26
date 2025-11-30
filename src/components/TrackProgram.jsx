import React from "react";
import Moment from "react-moment";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";
import VideoConfLink from "./VideoConfLink";

export default function TrackProgram({program, track, className = ""} = {}) {
  const sessions = program.sessions
    .filter(session => session.track && session.track.slug === track.slug)
    .sort((a, b) => a.slug <  b.slug
      ? -1 : (a.slug > b.slug ? 1 : 0));

  return (
    <div className={className}>
      {
        sessions.map((session, index) => (
          <div key={index} id={session.slug}>
            <h5 className="text-2xl font-extrabold mt-8 mb-1 leading-tight">
              Session {session.name}
            </h5>
            <p className="text-lg font-extrabold mt-0 text-indigo-600 leading-tight mb-2">
              <Moment format="DD MMM., dddd">{session.day.date}</Moment>,
              <Moment format="HH:mm" className="ml-3">{session.interval.startTime}</Moment>
              <span className="mx-1">-</span>
              <Moment format="HH:mm">{session.interval.endTime}</Moment>
            </p>

            {
              getSessionLink(program, session).map((link, index) => (
                <VideoConfLink link={link} className="my-6" key={index} />
              ))
            }


            <div className="sm:flex mt-4 mb-2">
              <h6 className="text-lg font-extrabold text-gray-600 leading-tight mb-1 sm:mb-0">
                Chairs:
              </h6>
              <ul className="pl-4 mb-4 list-disc sm:pl-0 sm:mb-0 sm:list-none sm:flex">
                {
                  session.chairs && session.chairs.map((chair, index) => (
                    <li key={index} className="mb-0 text-gray-700 font-medium leading-5 sm:ml-2">
                      {chair.appeal} {chair.name}{ index === session.chairs.length - 1 ? "" : ", "}
                    </li>
                  ))
                }
              </ul>
            </div>

            <SessionTable session={session} duration={program.common.lecture.duration} />
            <p className="mt-2 mb-10">
              <Link href={"/program"} as="/program#top">
                <a className="text-blue-500 hover:underline">
                  <FontAwesomeIcon icon={faAngleUp} className="mr-1" />
                  Back to top
                </a>
              </Link>
            </p>
          </div>
        ))
      }
    </div>
  );
};


// --------------------------------------------------------------------------------------
// PARTIALS
// --------------------------------------------------------------------------------------
function SessionTable({ session, duration, className = ""} = {}) {
  return (
    <div className={className}>
      <table className="min-w-full divide-y divide-gray-200">
        <tbody>
        {
          session.lectures.map((lecture, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-2 text-gray-700 leading-tight tracking-tighter text-sm py-2 w-1/6 lg:w-1/12">
                <div className="text-gray-700 font-bold">
                  {moment(lecture.startTime).tz('Europe/Moscow').format('HH:mm')}
                  <span className="text-xs font-lighter ml-1 tracking-tightest">MSK</span>
                  {/*<Moment format="HH:mm" tz="Europe/Moscow">{lecture.startTime}</Moment>*/}
                </div>
                <div className="text-gray-600 italic">
                  <FontAwesomeIcon icon={faClock} className="mr-1" />
                  {duration.minutes}m
                </div>
              </td>
              <td className="border border-gray-300 px-2 text-gray-700 leading-tight py-2">
                <div>
                  <Link href={"/papers/[id]"} as={`/papers/${lecture.paper.id}`}>
                    <a className="text-blue-500 hover:underline">{lecture.paper.title}</a>
                  </Link>
                </div>
                <div className="text-sm">
                  {lecture.paper.authors.map(a => a.name).join(", ")}
                </div>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  )
}


// --------------------------------------------------------------------------------------
// HELPERS
// --------------------------------------------------------------------------------------
function getSessionLink(program, session) {
  if (
    session.track && session.track.slug &&
    session.day && session.day.online && session.day.online.links
  ) {
    return session.day.online.links.filter(l => l.track.slug === session.track.slug);
  }
  return {};
}
