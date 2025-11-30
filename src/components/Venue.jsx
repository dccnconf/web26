import React from "react";

export const Venue = () => {
  return <div className="block">
    <img src="/images/undraw_navigation.svg" alt="Image navigation" className="w-4/5 mx-auto sm:w-2/5 sm:float-right pt-3"/>
    <div className="block">
      <p className="md:leading-7 md:text-xl md:mx-auto text-gray-700 mt-4">
        The DCCN-2026 conference will be held in a hybrid mode (with physical and virtual participation) in the premises of the RUDN University.
      </p>
      <p className="md:leading-7 md:text-xl md:mx-auto text-gray-700 mt-4">
        <span className="font-bold">Address:</span><br />
        <span className="italic"><a href="https://eng.rudn.ru/contacts"
                                    target="_blank"
                                    className="text-indigo-700">RUDN University</a>, </span>
        <span className="italic">Building of Engineering and Science faculties,
115419, Moscow, Ordzhonikidze str. 3</span>
      </p>
      <p className="md:leading-7 md:text-xl md:mx-auto text-gray-700 mt-4 font-bold">
        <a href="https://yandex.ru/maps/-/CDFSM4Io"
           target="_blank"
           className="text-indigo-700">View on Map</a>
      </p>
    </div>
  </div>
}
