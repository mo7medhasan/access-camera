import { memo } from 'react';

import Btn from './Btn';
import { PauseIcon, PlayIcon } from '@/public/Icons';

const Playback= ({ isPlaying, onToggle }) => (
  <Btn  onClick={onToggle}>
    {isPlaying ? <PauseIcon className="fill-mainYellow w-6 h-6"  width={24} height={24} /> : <PlayIcon className="fill-mainYellow  w-7 h-7" width={26} height={26}/>}
  </Btn>
);

export default memo(Playback);
