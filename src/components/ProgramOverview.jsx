import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faFilePdf} from "@fortawesome/free-regular-svg-icons";
import Moment from "react-moment";
import {
  faCircle,
  faCoffee,
  faUsers,
  faStar,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Link from "next/link";
import VideoConfCard from "./VideoConfCard";
import {getTrackTextColor} from "../libs/common/styling";

const ProgramOverview = ({ program, tracks, className = "" }) => {

  return (
    <div className={className}>

      {/* Navigation inside the program: */}
      <div className="border-b-2 pb-8">
        <p className="mb-4 text-lg text-gray-700 leading-7">You may find these links useful:</p>
        <ul className="list-disc pl-4">
          <li>
            <a href="/downloads/DCCN2023_program_overview.pdf" target="_blank" className="text-blue-500 hover:underline">
              <FontAwesomeIcon icon={faFilePdf} size="lg" className="mr-2 text-purple-500"/>DCCN2023_program_overview.PDF
            </a>
            <span className="ml-2 leading-7 text-gray-700 text-lg">
              - top view of the schedule grid in PDF format
            </span>
          </li>
          <li>
            <a href="/downloads/DCCN2023_program.pdf" target="_blank" className="text-blue-500 hover:underline">
              <FontAwesomeIcon icon={faFilePdf} size="lg" className="mr-2 text-purple-500"/>DCCN2023_program.PDF
            </a>
            <span className="ml-2 leading-7 text-gray-700 text-lg">
              - full conference program in PDF format
            </span>
          </li>
          <li>
            <Link href={"/program"} as="/program#plenary">
              <a className="text-blue-500 text-lg leading-7 hover:underline">
                <FontAwesomeIcon icon={faStar} className="mr-2 text-yellow-500" />
                <span>Plenary session program</span>
              </a>
            </Link>
          </li>
          {
            tracks && tracks.map((track, index) => (
              <li key={index}>
                <Link href={"/program"} as={`/program#${track.slug}`}>
                  <a className="text-blue-500 text-lg leading-7 hover:underline">
                    <FontAwesomeIcon icon={track.icon} className={`mr-2 ${getTrackTextColor(track, { heavy: true })}`} />
                    <span>Track {track.letter}: {track.name}</span>
                  </a>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>

      {/* Tables per day */}
      <div>
        {
          program.days.map((progDay, index) => (
            <div key={index}>
              <h3 className="text-xl font-extrabold text-left text-indigo-600 mb-0 mt-12">
                <Moment format="DD MMM. YYYY (dddd)">{progDay.date}</Moment>
              </h3>
              {
                progDay.description && (
                  <h4 className="text-lg font-extrabold text-gray-600 mt-0 mb-12">{progDay.description}</h4>
                )
              }
              <VideoConfCard
                className="my-8"
                videoHtml={progDay.online && progDay.video}
                links={(progDay.online && progDay.online.links) || []}
              />
              <ProgDayTable progDay={progDay} tracks={tracks} className="" />
            </div>
          ))
        }
      </div>
    </div>
  )
};


// =============== PARTIALS =====================================================

function ProgDayTable({progDay, tracks, className = ""} = {}) {
  return (
    <div className={className}>
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead>
        <tr className="">
          <th className="w-1/7 lg:w-1/12 th pl-2">Time</th>
          {
            (!progDay.plenary && !progDay.closing) ? tracks.map(t => (
              <th className="th text-center" key={t.letter}>

                  <>
                    <span className="block lg:hidden">Track {t.letter}</span>
                    <span className="hidden lg:block">Track {t.letter}: {t.name}</span>
                    <span className="hidden lg:block">(Room {t.room})</span>
                  </>

              </th>
            )) :
              progDay.closing && <th className="w-6/7 lg:w-11/12 th pl-2">
                <span className="block text-center">{progDay.tableTitle}</span>
              </th>
          }
        </tr>
        </thead>
        <tbody className="">
        {
          progDay.intervals.map((interval, index) => {
            return (
              <tr key={index}>
                <td className="border border-gray-300 px-2 text-gray-700 leading-tight tracking-tighter text-sm py-2">
                  <div className="text-gray-700 font-bold">
                    <Moment format="HH:mm">{interval.startTime}</Moment>
                  </div>
                  <div className="text-gray-600 italic">
                    <FontAwesomeIcon icon={faClock} className="mr-1" />
                    {getIntervalDurationStr(interval)}
                  </div>
                  {/*<div><Moment format="HH:mm">{interval.endTime}</Moment></div>*/}
                </td>
                {
                  interval.sessions && hasIntervalAnyTrack(interval)
                    ? (
                      <>
                        {
                          tracks.map((track, index) => <TrackSessionCell interval={interval} track={track} key={index}/>)
                        }
                      </>
                    )
                    : <SingleSessionCell interval={interval} tracks={tracks} isPlenary={progDay.plenary} />
                }
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
}

function TrackSessionCell({ track, interval }) {
  const matchingSessions = interval.sessions.filter(s => s.track.slug === track.slug);
  if (matchingSessions.length === 0)
    return <td className="border border-gray-300" />
  const session = matchingSessions[0];
  return (
    <td className="border border-gray-300 pr-2 text-gray-700 leading-tight font-medium">
      <div className="flex items-center">
        <div className="px-2">
          {
            getSessionIcon(session)
          }
        </div>
        <div className="font-medium">
          <div>
            <Link href={"/program"} as={`/program#${session.slug}`}>
              <a className="text-blue-500 hover:underline">
                Session {session.name}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </td>
  )
}

function SingleSessionCell({ interval, tracks, isPlenary = false } = {}) {
  let icon;
  let label;
  let bgColor = "";
  if (interval.sessions !== undefined) {
    const session = interval.sessions[0];
    icon = getSessionIcon(session);
    label = session.label;
  } else {
    icon = getIntervalIcon(interval);
    label = interval.label;
    bgColor = getIntervalBgColor(interval);
  }

  return (
    <td
      className={`border border-gray-300 pr-2 text-gray-700 leading-tight font-medium ${bgColor}`}
      colSpan={tracks.length}
    >
      <div className="flex items-center justify-center">
        <div className="px-2">{icon}</div>
        <div className="">
          {
            (isPlenary || interval.type === "plenary") && interval.type !== "break"
              ? (
                <Link href={"/program"} as="/program#plenary">
                  <a className="text-blue-500 hover:underline">
                    {label}
                  </a>
                </Link>
              ) : (
                <div>{label}</div>
              )
          }
        </div>
      </div>
    </td>
  )
}


// =========== HELPERS ===============================
function hasIntervalAnyTrack(interval) {
  if (interval.sessions === undefined)
    return false;
  return interval.sessions.some(s => s.track !== undefined);
}

function getSessionIcon(session, {size = "1x", className = ""} = {}) {
  let trackColor;
  let icon;
  if (session && session.track) {
    icon = faCircle;
    trackColor = getTrackTextColor(session.track);
  } else {
    icon = faStar;
    trackColor = 'text-yellow-400';
  }

  return <FontAwesomeIcon icon={icon} size={size} className={`${trackColor} ${className}`} />;
}

function getIntervalIcon(interval, {size = "1x", className = ""} = {}) {
  if (interval.type === "special")
    return <FontAwesomeIcon icon={faUsers} size={size} className={className} />
  if (interval.type === "panel")
    return <FontAwesomeIcon icon={faChalkboardTeacher} size={size} className={className} />
  if (interval.type === "break")
    return <FontAwesomeIcon icon={faCoffee} size={size} className={className} />
  return <></>
}

function getIntervalBgColor(interval) {
  if (interval.type === "special")
    return "bg-indigo-100";
  if (interval.type === 'panel')
    return "bg-teal-100";
  if (interval.type === 'break')
    return 'bg-gray-100';
}

function getIntervalDurationStr(interval) {
  const startTime = moment(interval.startTime);
  const endTime = moment(interval.endTime);
  const minutes = moment.duration(endTime.diff(startTime)).asMinutes();
  let durationStr;
  if (minutes >= 60) {
    const restMinutes = minutes % 60;
    const restMinutesStr = restMinutes > 0 ? `${restMinutes}m` : "";
    durationStr = `${Math.floor(minutes / 60)}h ${restMinutesStr}`;
  } else {
    durationStr = `${minutes}m`;
  }
  return durationStr;
}

export default ProgramOverview;
