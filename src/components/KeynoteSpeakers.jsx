import React from "react";
import KeynoteSpeakerCard from "./KeynoteSpeakerCard";

const KeynoteSpeakers = ({ speakers, className = ""}) => {
  return (
    <div className={className}>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {speakers.map(speaker => <KeynoteSpeakerCard speaker={speaker} key={speaker.slug} enableLink={!speaker.tba} />)}
      </div>
    </div>
  )
};

export default KeynoteSpeakers;
