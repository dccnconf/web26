import React from "react";
import {loadProgram} from "../../libs/program";
import {getPaper} from "../../libs/common/papers";
import Layout from "../../components/layout";
import Link from "next/link";
import Moment from "react-moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";

export default function PaperPage({ paper, session, lecture, duration }) {
  return (
    <Layout pageTitle={`Paper #${paper.id} | DCCN'2021`} active="program">
      <article className="container mx-auto md:w-2/3 py-12 px-4">

        {/* Breadcrumbs */}
        <div className="truncate text-sm sm:text-base max-w-sm mb-8">
          <Link legacyBehavior href={"/program"}>
            <a className="text-blue-500 hover:underline">
              Program
            </a>
          </Link>
          {
            session && session.track && (
              <>
                <span className="mx-2">/</span>
                <Link legacyBehavior href={"/program"} as={`/program#${session.track.slug}`}>
                  <a className="text-blue-500 hover:underline">
                    Track {session.track.letter}
                  </a>
                </Link>
              </>
            )
          }
          {
            session && (
              <>
                <span className="mx-2">/</span>
                <Link legacyBehavior href={"/program"} as={`/program#${session.slug}`}>
                  <a className="text-blue-500 hover:underline">
                    {session.name}
                  </a>
                </Link>
              </>
            )
          }
          <span className="mx-2">/</span>
          <Link legacyBehavior href={"/program"}>
            <a className="max-w-xs truncate">
              {paper.title}
            </a>
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl text-center md:text-left leading-7 font-extrabold">
          {paper.title}
        </h1>

        {/* Authors */}
        <div className="mt-4 text-lg text-gray-600 font-medium">
          {
            paper.authors && paper.authors.map(a => a.name).join(", ")
          }
        </div>

        <div className="mt-5 border-b-2 font-bold text-indigo-600">
          <Moment format="HH:mm, DD MMM. YYYY">
            {lecture.startTime}
          </Moment>
          <FontAwesomeIcon icon={faClock} className="ml-4 mr-1"/>
          <span className="">{duration.minutes}m</span>
        </div>

        <div className="mt-8 mb-12 text-xl leading-tight text-gray-700 markdown-box">
          {paper.abstract}
        </div>

      </article>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const paper = await getPaper(params.id);
  const program = await loadProgram({ noPaperFetch: true })

  // Find the session in which this paper appears:
  const paperId = parseInt(params.id);
  const sessions = program.sessions
    .filter(session => (
      session.lectures !== undefined &&
      session.lectures.filter(l => l.paperId === paperId).length > 0
    ));
  const session = sessions.length > 0 ? sessions[0] : {};

  // Find the lecture inside the session:
  let lectures = [];
  if (session.lectures !== undefined) {
    lectures = session.lectures.filter(l => l.paperId === paperId);
  }
  const lecture = lectures.length > 0 ? lectures[0] : {};

  // Find the duration:
  const duration = program.common.lecture.duration;

  return {
    props: {
      paper,
      session,
      lecture,
      duration,
    }
  }
}

export async function getStaticPaths() {
  const program = await loadProgram({ noPaperFetch: true });
  const lectures = [];
  for (const session of program.sessions) {
    if (session.lectures !== undefined) {
      lectures.push(...session.lectures);
    }
  }
  const paperIds = lectures
    .filter(l => l.paperId !== undefined)
    .map(l => l.paperId);

  return {
    paths: paperIds.map(id => ({params: {id: id.toString()}})),
    fallback: false,
  };
}
