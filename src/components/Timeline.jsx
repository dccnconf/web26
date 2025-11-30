import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import Moment from 'react-moment';
import moment from "moment";

const Timeline = ({ deadlines }) => {
  return deadlines && (
    <>
      <div className="relative">
        <div className="border-r-4 border-gray-400 absolute h-full top-0" style={{left: 22}} />
        <ul className="list-none m-0 pt-3 pb-1">
          {deadlines.map((deadline, index) => (
            <TimelineItem
              icon={getStatusIcon(deadline.date)}
              date={deadline.date}
              iconClassName={getStatusColorClass(deadline.date)}
              headerClassName={getHeaderColorClass(deadline.date)}
              key={index}
            >
              {deadline.events.map((event, index) => (
                <div className={event.important ? "text-gray-900 font-extrabold md:text-xl": "text-base"} key={index}>
                  {event.event}
                </div>
              ))}
            </TimelineItem>
          ))}
        </ul>
      </div>
    </>
  ) || (<></>)
};


const TimelineItem = ({ iconClassName = 'bg-gray-400', headerClassName = 'text-indigo-600', icon, date, children }) => (
  <li className="mb-6">
    <div className="flex items-center">
      <div className={`${iconClassName} rounded-full flex items-center justify-center z-10`} style={{height: "48px", width: "48px"}}>
        {icon && <FontAwesomeIcon icon={icon} size="lg" className="text-white" />}
      </div>
      <div className="flex-grow pl-8 lg:flex lg:items-center w-2/5">
        <div className="lg:w-64 shrink-0">
          <h3 className={`font-extrabold text-xl md:text-2xl ${headerClassName}`}>
            <Moment parse="DD.MM.YYYY" format="DD MMM YYYY">
              {date}
            </Moment>
          </h3>
        </div>
        <div className="mt-2 lg:mt-0 text-gray-500 text-lg font-bold">
          {children}
        </div>
      </div>
    </div>
  </li>
);


const getStatusIcon = date => {
  date = moment(date, "DD.MM.YYYY");
  const now = new Date();
  if (date <= now) {
    return faCheck;
  }
  return undefined;
};

const getStatusColorClass = date => {
  date = moment(date, "DD.MM.YYYY");
  const now = new Date();
  if (date < now) {
    return 'bg-indigo-200';
  }
  return 'bg-gray-300';
};


const getHeaderColorClass = date => {
  date = moment(date, "DD.MM.YYYY");
  const now = moment();
  if (date < now) {
    return 'text-indigo-300';
  } else if (date.isBefore(now.add(10, 'd'))) {
    return 'text-indigo-700';
  }
  return 'text-indigo-600';
};

export default Timeline;
