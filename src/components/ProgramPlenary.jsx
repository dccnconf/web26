import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {faCoffee, faDoorOpen, faFlag, faFlagCheckered, faGraduationCap, faComment, faAddressCard} from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import SpeakerSmallCard, {ChairSmallCard} from "./SpeakerSmallCard";
import VideoConfCard from "./VideoConfCard";

const ProgramPlenary = ({ schedule, className = "" }) => {
  // First, we need to build a plain sequence of items (now lectures are inside parts)
  const rows = [];
  for (const part of schedule.parts) {
    rows.push({...part});
    if (part.type === "session") {
      for (const lecture of part.lectures) {
        const item = {type: "lecture", ...lecture};
        rows.push(item);
      }
    }
  }
  // Put closing record manually
  // rows.push({
  //   type: "closing",
  //   startTime: schedule.parts[schedule.parts.length - 1].endTime,
  //   name: "Plenary session closing"
  // });

  return (
    <div className={className}>
      <VideoConfCard links={schedule.links} videoHtml={schedule.video} className="mt-8" />
      <div className="relative mt-8">
        <div className="border-r-4 border-gray-400 absolute h-full top-0" style={{left: 22}} />
        <ul className="list-none m-0 pt-3 pb-1">
          {rows.map((item, index) => (
            <TimelineItem
              item={item}
              key={index}
            >
              <ItemContent item={item} className="" />
            </TimelineItem>
          ))}
        </ul>
      </div>
    </div>
  ) || (<></>)
};


const TimelineItem = ({ item, children }) => {
  const icon = getStatusIcon(item);
  return (
    <li className="mb-12">
      <div className="flex items-center">
        <div className={`${getIconSizeClass(item)} flex-none ${getCircleColorClass(item)} rounded-full flex items-center justify-center z-10`}>
          {icon && <FontAwesomeIcon icon={icon} size="lg" className="text-white" />}
        </div>
        <div className="flex-grow pl-8 lg:flex lg:items-start">
          {children}
        </div>
      </div>
    </li>
  );
};


const ItemContent = ({ item, className = "" } = {}) => {
  switch (item.type) {
    case "registration":
      return <OpeningItemContent item={item} className={className} />;
    case "session":
    case "break":
    case "closing":
      return <GenericItemContent item={item} className={className} />
    case "lecture":
      return <LectureItemContent item={item} className={className} />
    case "welcomeSpeech":
    case "opening":
      return <WelcomeSpeechItemContent item={item} className={className} />;
    default:
      return <></>
  }
};


const OpeningItemContent = ({ item, className = "" } = {}) => (
  <div className={className}>
    <p className="text-indigo-600 font-extrabold mb-0">
      <Moment format="DD MMM, HH:mm">{item.startTime}</Moment>
    </p>
    <h6 className="text-xl font-bold text-gray-800">{item.name}</h6>
    {item.chairs.map(c => {
      return <ChairSmallCard key={c.id} chair={c} className="mt-2"/>
    })}
  </div>
);

const WelcomeSpeechItemContent = ({ item, className = "" } = {}) => {
  return <div className={className}>
    <p className="text-indigo-600 font-extrabold mb-0">
      <Moment format="HH:mm">{item.startTime}</Moment>
    </p>
    <h6 className="text-xl font-bold text-gray-800">{item.name}</h6>
    {item.chairs.map(c => {
      return <ChairSmallCard key={c.id} chair={c} className="mt-2"/>
    })}
  </div>
};


const GenericItemContent = ({ item, className = "" } = {}) => (
  <div className={className}>
    <p className="text-indigo-600 font-extrabold mb-0">
      <Moment format="HH:mm">{item.startTime}</Moment>
      {
        item.endTime !== undefined && (<>
          <span>-</span>
          <Moment format="HH:mm">{item.endTime}</Moment>
        </>)
      }
    </p>
    <h6 className="text-xl font-bold text-gray-800">{item.name}</h6>
  </div>
);


const LectureItemContent = ({ item, className = "" } = {}) => (
  <div className={className}>
    <p className="mb-0 font-bold text-gray-700">
      <span className="">
        <Moment format="HH:mm">{item.startTime}</Moment>
      </span>
      <span className="ml-3">
        <FontAwesomeIcon icon={faClock} className="mr-1" />
        {item.duration}
      </span>
    </p>
    <Link href={"/keynotes/[slug]"} as={`/keynotes/${item.speaker.slug}`}>
      <a className="text-xl font-medium leading-7 text-blue-500 hover:underline cursor-pointer">{item.data.title}</a>
    </Link>
    <div className="flex flex-col lg:flex-row w-100 lg:items-center">
      <SpeakerSmallCard speaker={item.speaker} className="mt-2" />
      { item.speaker.coauthor ? <>
        <span className="hidden lg:block mt-2 mr-2 ml-2"> and </span>
        <SpeakerSmallCard speaker={item.speaker.coauthor} className="mt-2" /></>
        : null}
    </div>
  </div>
);


const getStatusIcon = (item) => {
  switch (item.type) {
    case "opening":
      return faDoorOpen;
    case "session":
      return faFlag;
    case "break":
      return faCoffee;
    case "lecture":
      return faGraduationCap;
    case "closing":
      return faFlagCheckered;
    case "welcomeSpeech":
      return faComment;
    case "registration":
      return faAddressCard;
    default:
      return undefined;
  }
};

const getIconSizeClass = (item) => {
  if (item.type !== "lecture")
    return "h-16 w-16 -ml-2"
  return "h-12 w-12"
}

const getCircleColorClass = (item) => {
  if (item.type === "opening")
    return "bg-gray-500";
  if (item.type === "session")
    return "bg-gray-400";
  if (item.type === "break")
    return "bg-pink-300";
  if (item.type === "lecture")
    return "bg-indigo-300";
  if (item.type === "closing")
    return "bg-gray-500";
  return "bg-gray-500";
}

export default ProgramPlenary;
