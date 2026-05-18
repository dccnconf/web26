import Layout from "../../components/layout";
import React from "react";
import {getAllSpeakersSlugs, getKeynote} from "../../libs/keynotes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faFilePdf, faStar} from "@fortawesome/free-regular-svg-icons";
import KeynoteSpeakerCard from "../../components/KeynoteSpeakerCard";
import Moment from "react-moment";
import SpeakerSmallCard from "../../components/SpeakerSmallCard";

// TODO add timetable and duration for each speaker
const KeynotePage = ({ keynote }) => {
  return (
    <Layout pageTitle={"Keynote | DCCN'2026"} active="conference">
      {
        keynote && (
          <section className="container mx-auto my-12 py-12">
            <article className="container mx-auto md:w-2/3 pb-12 p-8">
              <p className="mb-1 font-extrabold md:text-2xl text-indigo-600">
                <FontAwesomeIcon icon={faStar} />
                <span className="ml-2">Keynote</span>
              </p>
              <h1 className="text-2xl md:text-4xl text-center md:text-left leading-10 font-extrabold">
                {keynote.title}
              </h1>

              <SpeakerSmallCard speaker={keynote.speaker} className="mt-4 font-medium text-gray-600" />
              {keynote.coauthor ? <SpeakerSmallCard speaker={keynote.coauthor} className="mt-4 font-medium text-gray-600" /> : null }

              {/*<div className="mt-3 border-b-2 font-extrabold text-indigo-600 text-lg">*/}
              {/*  <Moment format="HH:mm, DD MMM. YYYY">*/}
              {/*    {keynote.lecture.startTime}*/}
              {/*  </Moment>*/}
              {/*  <FontAwesomeIcon icon={faClock} className="ml-4 mr-1"/>*/}
              {/*  <span className="">{keynote.lecture.duration}</span>*/}
              {/*</div>*/}

              <div className="my-12 text-xl leading-tight text-gray-700 markdown-box">
                <div dangerouslySetInnerHTML={{__html: keynote.abstract}} />
              </div>
              {
                keynote.speaker.presentation ?
                  <a href={keynote.speaker.presentation} target="_blank" className="text-blue-500 hover:underline">
                    <FontAwesomeIcon icon={faFilePdf} size="lg" className="mr-2 text-purple-500"/>Presentation
                  </a> : null
              }

            </article>

            <div className="container mx-auto mt-12 bg-indigo-100">
              <div className="container md:w-2/3 mx-auto p-8 items-start">
                {/*<div className="lg:w-1/4 pr-8 lg:mt-12 lg:pt-12">*/}
                <h3 className="text-2xl md:text-4xl font-extrabold text-center lg:text-center">About the speaker</h3>
                {/*</div>*/}
                <div className="flex-grow w-full mt-12">
                  <KeynoteSpeakerCard speaker={keynote.speaker} enableLink={false} />
                  <div className="mt-12 md:text-lg leading-tight text-gray-800 markdown-box">
                    <div dangerouslySetInnerHTML={{__html: keynote.bio}} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      }
    </Layout>
  );
};

export const getStaticProps = async ({ params }) => {
  const keynote = await getKeynote(params.slug);
  return {
    props: {
      keynote
    }
  }
};

export const getStaticPaths = () => {
  const slugs = getAllSpeakersSlugs();
  return {
    paths: slugs.map(slug => ({params: {slug}})),
    fallback: false
  }
};

export default KeynotePage;
