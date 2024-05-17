import React from 'react';
import { Forward } from 'lucide-react';

const ShareButton = ({ isActive, onClick, ...rest }) => {
  return (
    <button
      className={`
        flex items-center justify-center z-[9999]  text-white
        outline-none  transition-all duration-200 transform
        ${isActive ? `transform scale-80` : ''}
      `}
      onClick={onClick}
      {...rest}
    >
      <Forward strokeWidth={3} color='#DEDEDECC' className="fill-[#DEDEDECC] w-5 h-5 mx-auto"  />
    </button>
  );
};

export default ShareButton;
