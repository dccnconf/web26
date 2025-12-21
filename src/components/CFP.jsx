import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArchive, faLink} from "@fortawesome/free-solid-svg-icons";


const CFP = ({topics, className = ""} = {}) => {
  return (
    <div className={className}>
      <p className="md:text-lg">
        Authors are encouraged to submit their papers (4-6 pages) in Russian or English language via the online
        registration system <a href="https://uconfy.com" target="_blank" className="text-indigo-700">uConfy.com</a>.
        The accepted papers will be published in the Conference Proceedings volume (included into the Russian Science
        Citation Index).
      </p>
      <div className="pl-8 mt-8">
        <a href="/downloads/DCCN2026_LaTeX_RU.zip" className="text-indigo-700">
          <FontAwesomeIcon icon={faArchive} size="lg" className="mr-3"/>
          <span className="md:text-lg align-middle">Template in Russian</span>
        </a>
      </div>
      <div className="pl-8 mt-4">
        <a href="/downloads/DCCN2026_LaTeX_ENG.zip" className="text-indigo-700">
          <FontAwesomeIcon icon={faArchive} size="lg" className="mr-3"/>
          <span className="md:text-lg align-middle">Template in English</span>
        </a>
      </div>

      <p className="md:text-lg mt-8">
        For your convenience, we made available the DCCN templates in the scientific authoring platform Overleaf:
      </p>
      <div className="mt-4 pl-8">
        <a href="https://www.overleaf.com/latex/templates/dccn2026-latex-ru/sddtycjtjmbx"
           target="_blank"
           className="text-indigo-700">
          <FontAwesomeIcon icon={faLink} size="lg" className="mr-3"/>
          <span className="text-lg align-middle">Overleaf DCCN'2026 Submission Template (RUS)</span>
        </a>
      </div>
      <div className="mt-4 pl-8">
        <a href="https://www.overleaf.com/latex/templates/dccn2026-latex-eng/pztfxxdfnvcm"
           target="_blank"
           className="text-indigo-700">
          <FontAwesomeIcon icon={faLink} size="lg" className="mr-3"/>
          <span className="text-lg align-middle">Overleaf DCCN'2026 Submission Template (ENG)</span>
        </a>
      </div>

      <p className="md:text-lg mt-8">
        After a peer review and plagiarism check, authors of selected submissions in English, recommended by the Program
        Committee,
        will be invited to submit their extended papers (12-15 pages in Springer LNCS template).
        After a second round of review the accepted extended papers will be published by Springer (approval received)
        as a stand-alone volume of selected extended papers (indexed in Scopus and Web of Science).
      </p>

      <div className="pl-8 mt-4">
        <a href="/downloads/lncs.zip" className="text-indigo-700">
          <FontAwesomeIcon icon={faArchive} size="lg" className="mr-3"/>
          <span className="md:text-lg align-middle">Springer LNCS template</span>
        </a>
      </div>

      <p className="md:text-lg mt-8">
        Please note, that peer review is double-blind. In order to provide the possibility of double-blind peer review,
        when
        first submitting the manuscripts the authors are asked to leave empty all fields that may identify the authors
        (names, emails, affiliations, grant support).
        In case a submission is not blinded, it will not move on to the review process.
      </p>
      <p className="md:text-lg mt-8">
        <span className="font-extrabold text-xl text-indigo-500 mr-1">Topics</span> include, but are not limited to the
        following fields:
      </p>
      <ul className="list-inside md:text-lg pl-2 mt-4 list-disc leading-6">
        {topics.map((topic, index) => <li className="text-base" key={index}>{topic}</li>)}
      </ul>
    </div>
  )
};

export default CFP;
