import React from "react";


const CommitteeMembersList = ({ members, className = "" }) => {
  return (
    <div className={className}>
      <div className="flex flex-col md:flex-row md:flex-wrap">
        {
          members
            .map(member => (
              <MemberCard
                member={member}
                className="mt-8 w-3/4 md:w-1/2 md:px-12"
                key={member.order}
              />))
        }
      </div>
    </div>
  );
}


const MemberCard = ({ member, className = "" }) => (
  <div className={className}>
    <div className="flex items-center">
      {
        member.avatar && (<img
          src={member.avatar}
          alt={`${member.name} avatar`}
          className="w-20 flex-shrink-0 h-20 rounded-full object-cover mr-4"
        />)
      }
      <div className="self-start">
        {
          member.chair && (
            <div className="mt-3 text-sm text-indigo-500 font-bold">
              General Chair
            </div>
          )
        }
        <h6 className="text-lg font-bold text-black">{member.name}</h6>
        <ul className="mt-1 text-gray-600 font-medium">
          {
            member.affiliations.map(org => (
              <li
                className="leading-tight mb-2 text-sm"
                key={org.slug}
              >
                {org.name}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  </div>
);

export default CommitteeMembersList;
