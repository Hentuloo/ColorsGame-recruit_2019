import gameConfig from 'config/gameConfig';

export const randomColorId = () => {
  const avaiableColors = gameConfig.colors;
  const randomObject = Math.floor(Math.random() * avaiableColors.length);
  const { id } = avaiableColors[randomObject];
  return id;
};

export const createAllFields = () => {
  const { fieldsWidth, fieldsHeight } = gameConfig;
  const amountOfFields = fieldsWidth * fieldsHeight - 1;

  const fields = [];
  for (let i = 0; i <= amountOfFields; i++) {
    const colorId = randomColorId();
    fields.push({
      id: i,
      colorId,
      kill: false, // change color with next round
    });
  }
  return fields;
};

export const compareColorsOfFields = (currentField, nextField) => {
  const { fieldsWidth, fieldsHeight } = gameConfig;
  const amountOfFields = fieldsWidth * fieldsHeight - 1;
  if (currentField.id < 0 || currentField.id > amountOfFields) {
    return false;
  }
  if (currentField.colorId !== nextField.colorId || nextField.kill === true) {
    return false;
  }

  return true;
};
