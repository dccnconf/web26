import React from "react";

const SpeakerSmallCard = ({speaker, className = "font-medium text-gray-700"} = {}) => (
  <div className={className}>
    <div className="flex items-center">
      <img src={speaker.avatar} alt="" className="w-6 h-6 rounded-full mr-2"/>
      <div>
        <span className="mr-2">{speaker.appeal} {speaker.name}</span>
        (<span className="">{speaker.country}</span>)
      </div>
    </div>
  </div>
);

const ChairSmallCard = ({chair, className = "font-medium text-gray-700"} = {}) => {
  return <div className={className}>
    <div className="flex items-center">
      <img src={chair.avatar} alt="" className="w-6 h-6 rounded-full mr-2"/>
      <div>
        <span className="mr-2">{chair.name},</span>
        {
          chair.position ?
            <span className="">{chair.position},</span> :
            null
        }
        <span className="mr-2">{chair.affiliations.map(c => c.name).join(",")} </span>
      </div>
    </div>
  </div>
};

export {
  SpeakerSmallCard,
  ChairSmallCard
}

export default SpeakerSmallCard;
