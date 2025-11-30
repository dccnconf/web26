import React from "react";

export const Venue = () => {
  return <div className="block">
    <img src="/images/undraw_navigation.svg" alt="Image navigation" className="w-4/5 mx-auto sm:w-2/5 sm:float-right pt-3"/>
    <div className="block">
      <p className="md:leading-7 md:text-xl md:mx-auto text-gray-700 mt-4">
        The DCCN-2025 conference will be held in a hybrid mode (with physical and virtual participation) in the premises of the V.A. Trapeznikov Institute of Control Sciences of Russian Academy of Sciences (ICS RAS).
      </p>
      <p className="md:leading-7 md:text-xl md:mx-auto text-gray-700 mt-4">
        <span className="font-bold">Address:</span><br />
        <span className="italic"><a href="https://www.ipu.ru/en/contacts"
                                    target="_blank"
                                    className="text-indigo-700">ICS RAS</a>, </span>
        <span className="italic">65 Profsoyuznaya street, Moscow 117997, Russia</span>
      </p>
      <p className="md:leading-7 md:text-xl md:mx-auto text-gray-700 mt-4 font-bold">
        <a href="https://yandex.ru/maps/-/CCU0NJQTdA"
           target="_blank"
           className="text-indigo-700">View on Map</a>
      </p>
    </div>
  </div>
}
