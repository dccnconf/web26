import VideoConfLink from "./VideoConfLink";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilePdf, faQuestionCircle} from "@fortawesome/free-regular-svg-icons";

const VideoConfCard = ({ links, videoHtml, className = "", isGreen = false } = {}) => {
  if (!links || links.length === 0) {
    return <div className={className} />
  }
  const boxColorClass = !!isGreen ? 'border-green-200 bg-green-100' : 'border-gray-200, bg-gray-100';
  return (
    <div className={className}>
      <div className={`border-2 ${boxColorClass} px-6`}>
        <div className="">
          <div className="md:flex md:items-center">
            {/*{*/}
            {/*  !!videoHtml && (*/}
            {/*    <div className="md:mr-8 mb-8 md:mb-0">*/}
            {/*      <div dangerouslySetInnerHTML={{__html: videoHtml}}/>*/}
            {/*    </div>*/}
            {/*  )*/}
            {/*}*/}
            <ul className="">
              {
                links.filter(link => !link.disabled).map((link, index) => (
                  <li key={index} className="my-3">
                    <VideoConfLink link={link} linkClassName="text-blue-500 text-lg" />
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="mt-0 mb-2">
            <a href="/downloads/MS_TEAMS_INSTRUCTION.pdf" target="_blank" className="hover:underline text-yellow-600">
              <FontAwesomeIcon icon={faQuestionCircle} className="mr-4" />
              <FontAwesomeIcon icon={faFilePdf} className="mr-4" />
              How to use MS Teams
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConfCard;
