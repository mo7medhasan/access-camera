import { memo } from 'react';

import Btn from './Btn';
import { RewindIcon } from '@/public/Icons';



const Rewind= ({ onRewind }) => {
  return (
    <Btn label="- 10 seconds" onClick={onRewind}>
      <RewindIcon className="fill-mainYellow" />
    </Btn>
  );
};

export default memo(Rewind);
