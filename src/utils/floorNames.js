export const getFloorName = (floorNum) => {
  let floorName = "";
  let tens = "";
  let hasTens = false;

  if (floorNum > 20 && floorNum < 100) {
    tens = Math.floor(floorNum / 10);
    floorNum %= 10;
    hasTens = true;
  }

  switch (floorNum) {
    case 0:
      floorName = `Ground Floor`;
      break;
    case 1:
      floorName = `${floorNum}st`;
      break;
    case 2:
      floorName = `${floorNum}nd`;
      break;
    case 3:
      floorName = `${floorNum}rd`;
      break;
    default:
      floorName = `${floorNum}th`;
      break;
  }

  if (hasTens) {
    floorName = tens + floorName;
  }
  return floorName;
};
