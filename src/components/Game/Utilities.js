import gameConfig from 'config/gameConfig';

export const randomColor = () => {
  const avaiableColors = gameConfig.colors;
  const randomObject = Math.floor(Math.random() * avaiableColors.length);
  const { id } = avaiableColors[randomObject];
  return id;
};

export const createAllFields = () => {
  const { fieldsWidth, fieldsHeight } = gameConfig;
  const fields = [];
  for (let xDirection = 1; xDirection <= fieldsWidth; xDirection++) {
    for (let yDirection = 1; yDirection <= fieldsHeight; yDirection++) {
      const uniqueIndex = xDirection * 10 + yDirection - 10;
      const colorId = randomColor();
      fields.push({
        id: uniqueIndex,
        x: xDirection,
        y: yDirection,
        colorId,
      });
    }
  }
  return fields;
};
