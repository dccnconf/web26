import React from "react";
import Link from "next/link";

const KeynoteSpeakerCard = ({ speaker, enableLink = true } = {}) => (
  <div
    key={speaker.slug}
    className="flex pr-4"
  >
    <SpeakerImage speaker={speaker} enableLink={enableLink} />
    <div>
      <SpeakerName speaker={speaker} enableLink={enableLink} />
      <div className="text-black font-bold mt-1">
        {speaker.country}
      </div>
      <ul className="leading-tight">
        {
          speaker.affiliations.map((aff, index) => (
            <li key={index} className="mt-3">
              <div className="text-gray-700 font-bold">{aff.name}{aff.department && ","}</div>
              {aff.department && (
                <div className="text-sm text-gray-600">{aff.department}</div>
              )}
              {
                aff.position && (
                  <div className="font-extrabold text-sm text-indigo-400">{aff.position}</div>
                )
              }
            </li>
          ))
        }
      </ul>
    </div>
  </div>
);

const SpeakerImage = ({ speaker, enableLink }) => {
  const imgClassName = enableLink ? 'cursor-pointer' : '';
  const image = (
    <img
      className={`object-cover mr-6 ${imgClassName}`}
      src={speaker.avatar}
      alt={`${speaker.name} avatar`}
      style={{width: 128, height: 164, minWidth: 128}}
    />
  );
  return enableLink ? (
    <Link href="/keynotes/[slug]" as={`/keynotes/${speaker.slug}`}>
      {image}
    </Link>
  ) : image;
};

const SpeakerName = ({ speaker, enableLink }) => {
  const commonClassName = "font-extrabold text-lg md:text-2xl leading-tight";
  const customClassName = enableLink ? "text-blue-500 hover:underline" : "text-indigo-600 mb-1";
  if (enableLink) {
    return (
      <Link href="/keynotes/[slug]" as={`/keynotes/${speaker.slug}`}>
        <a className={`${commonClassName} ${customClassName}`}>
          {speaker.appeal} {speaker.name}
        </a>
      </Link>
    );
  }
  return (
    <p className={`${commonClassName} ${customClassName}`}>
      {speaker.appeal} {speaker.name}
    </p>
  );

};

export default KeynoteSpeakerCard;
