import React from "react";


// noinspection JSUnresolvedVariable
const SponsorImgLink = ({ organization, className = "block mr-8", style }) => (
  <a href={organization.url} className={className}>
    <img src={organization.logotype}
         alt={`${organization.shortName} logotype`}
         style={style}
    />
  </a>
);


const SponsorsImageGallery = ({ organizations, className = "" }) => {
// noinspection JSUnresolvedVariable
  const members = organizations
    .filter(org => org.member !== undefined)
    .sort((a, b) =>
      (a.member.order < b.member.order)
        ? -1
        : (a.member.order === b.member.order) ? 0 : 1);

  const getStyle = (slug) => {
    if (slug === "rudn")
      return {minWidth: 64, width: 220};
    if (slug === "springer")
      return {minWidth: 64, width: 220};
    if (slug === "incet")
      return {minWidth: 64, width: 120};
    return {minWidth: 48, width: 82};
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap px-4 items-center justify-center">
        {
          members.map(organization => (
            <SponsorImgLink
              organization={organization}
              style={getStyle(organization.slug)}
              key={organization.member.order}
            />
          ))
        }
      </div>
    </div>
  );
}

export default SponsorsImageGallery;
