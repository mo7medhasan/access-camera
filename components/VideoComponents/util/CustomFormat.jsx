
const padToTwo = (number) => (number <= 9 ? `0${number}` : number);

export const displayTime = (centiseconds) => {
  let minutes = 0;
  let seconds = 0;

  if (centiseconds < 0) {
    centiseconds = 0;
  }

  if (centiseconds < 60) {
    return `0:${padToTwo(centiseconds)}`;
  }

  let remainCentiseconds = centiseconds % 60;
  seconds = (centiseconds - remainCentiseconds) / 60;

  if (seconds < 60) {
    return `${seconds}:${padToTwo(remainCentiseconds)}`;
  }
};