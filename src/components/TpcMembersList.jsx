import React from "react";

const TpcMembersList = ({ members, className = ""}) => {
  return (
    <div className={className}>
      <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {
          members && members.map((member, index) => (
            <TpcMember
              member={member}
              key={index}
            />
          ))
        }
      </div>
    </div>
  )
};

const TpcMember = ({ member, className = "" }) => {
  return (
    <div className={className}>
      {
        member.chair && (
          <div className="text-sm text-indigo-500 font-bold">
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
      {
        member.countries && (
          <p className="mt-2 text-sm font-bold text-gray-600">
            {member.countries[0]}
            {
              member.ieee && (
                <span className="ml-2">
                  | IEEE {member.ieee}
                </span>
              )
            }
          </p>
        )
      }
    </div>
  )
};

export default TpcMembersList;
