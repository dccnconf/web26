import React from "react";

const Fees = ({ fees, className = "" }) => {
  return (
    <div className={className}>
      <p className="md:leading-7 md:text-xl text-gray-700">
        At least one author per accepted paper must pay the registration fee and present the paper in the conference session where the paper is scheduled.
        Please note, that once the registration payment is done, <span className="text-red-800 font-bold">no refund is available</span>.
      </p>
      <p className="md:leading-7 md:text-xl text-gray-700 mt-8">
        Registration fees are waived for invited keynote speakers and for invited reviewers.
        The reviewers undertake to carefully and professionally evaluate at least 5 submitted manuscripts in an objective and impartial manner.
      </p>
      <FeesTable fees={fees} className="my-12" />
      {/*<h3 className="h3 mt-12">Payment information</h3>*/}
      {/*<p className="md:leading-7 md:text-xl text-gray-700 mt-8">*/}
      {/*  To pay the registration fee (online), please follow the  <a href="https://portal.pfur.ru:4443/Free/OfferPayEn.aspx?num=3222264001150" target="_blank" className="text-blue-500 hover:underline">link</a>.*/}
      {/*  To participate in DCCN-2023 one has to accept the public offer. The public offer is available at the <a href="/downloads/public_offer.pdf" target="_blank" className="text-blue-500 hover:underline">following link</a>.*/}
      {/*  Acceptance of the Offer is carried out by paying the registration fee in the order covered by Section 3 of the Offer, and sending a confirmation of payment to the following email*/}
      {/*  address: <a href="mailto:org@dccn.ru" className="text-blue-500 hover:underline">org@dccn.ru</a>.*/}
      {/*</p>*/}
      {/*<p className="md:leading-7 md:text-xl text-gray-700 mt-8">*/}
      {/*  <span className="text-red-800 font-bold">Important:</span> when paying, please, completely indicate the first name and the last name of the payer. Otherwise we may not be able to identify the payer.*/}
      {/*</p>*/}
    </div>
  )
};

export const FeesTable = ({ fees, className = "" }) => {
  // First we need to order prices by IEEE membership:
  for (const record of fees) {
    record.prices.sort((a, b) => (!a.ieeeMember && b.ieeeMember) ? -1 : (!!a.ieeeMember === !!b.ieeeMember) ? 0 : 1);
  }

  return (
    <div className={className}>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                <tr>
                  <th
                    className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                    PARTICIPANTS
                  </th>
                  <th
                    className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                    NO IEEE MEMBERSHIP
                  </th>
                  <th
                    className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                    IEEE MEMBER
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {
                  fees.map(fee => (
                    <FeeTableRow fee={fee} key={fee.order} />
                  ))
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FeeTableRow = ({ fee }) => {
  const regularPrice = fee.prices[0];
  const ieeePrice = fee.prices[1];
  const discount = regularPrice.price > 0 ? (1 - ieeePrice.price / regularPrice.price) * 100 : undefined;

  return (
    <tr>
      <td className="px-6 py-4 text-gray-700 leading-tight md:text-lg">
        {fee.category}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-bold">
        {regularPrice.price} {regularPrice.currency}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap font-bold text-center">
        <div className="text-green-700">
          {ieeePrice.price} {ieeePrice.currency}
        </div>
        {
          discount !== undefined && (
            <div className="font-medium text-sm text-green-500 font-bold">
              -{discount.toFixed(0)}%
            </div>
          )
        }
      </td>
    </tr>
  );
}

export default Fees;
