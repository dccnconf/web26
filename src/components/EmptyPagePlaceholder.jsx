import React from 'react';

const EmptyPagePlaceholder = ({imageName, imageAlt, children, scale = "1/2"}) => {
  return (
    <div className="flex flex-col items-center justify-center my-12 h-screen lg:flex-row lg:my-0">
      <div className={`mx-auto lg:mx-10 w-1/2 lg:w-${scale}`}>
        <img src={`/images/${imageName}`} alt={imageAlt} />
      </div>
      <div className="mt-10 lg:mt-0 text-center lg:text-left">
        {children}
      </div>
    </div>
  );
};

export default EmptyPagePlaceholder;
