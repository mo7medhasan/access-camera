import { memo } from 'react';

import Btn from './Btn';
import { RewindIcon } from '@/public/Icons';


const Skip= ({ onSkip }) => {
  return (
    <Btn label="+ 10 seconds" onClick={onSkip}>
      <RewindIcon className="fill-mainYellow rotate-180" />
    </Btn>
  );
};

export default memo(Skip);
