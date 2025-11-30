import React from "react";
import {faWindows, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faVideo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const VideoConfLink = ({ link, className = "", linkClassName = "text-blue-500 text-lg"} = {}) => {
  return (
    <div className={className}>
      <a href={link.url} target="_blank" className={`${linkClassName} cursor-pointer hover:underline`}>
        <FontAwesomeIcon icon={getLinkIcon(link)} className={getLinkIconClassName(link)} />
        {link.text}
      </a>
    </div>
  )
};

const getLinkIcon = link => {
  if (link.type === "teams")
    return faWindows;
  if (link.type === "youtube")
    return faYoutube;
  return faVideo;
};

const getLinkIconClassName = link => {
  if (link.type === "teams")
    return "ml-1 mr-3"
  return "mr-4"
}

export default VideoConfLink;
