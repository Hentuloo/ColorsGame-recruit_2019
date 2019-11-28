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

export const stateWithKilledField = (id, fieldsState) => {
  const newFieldState = fieldsState;
  newFieldState[id].kill = true;
  return newFieldState;
};
export const refreshFieldsState = fieldsState => {
  return fieldsState.map(field => {
    if (field.kill === true) {
      return {
        ...field,
        colorId: randomColorId(),
        kill: false,
      };
    }
    return field;
  });
};
export const collapseFieldsByKilledFlag = (id, fieldsState) => {
  const newState = fieldsState;
  const { fieldsWidth } = gameConfig;

  let startField = id;
  let upperFieldId = id - fieldsWidth;

  // if field is on in first row
  if (upperFieldId <= 0) {
    newState[startField].kill = true;
    return newState;
  }

  do {
    // change color from upper field
    const upperField = fieldsState[upperFieldId];
    const { colorId, kill } = upperField;

    // if upperField is not killed
    if (kill === false) {
      // change (startField) lower field
      newState[startField].colorId = colorId;
      newState[startField].kill = false;
      newState[upperFieldId].kill = true;
      startField -= fieldsWidth;
    }
    // go to next upper field and check limit
    upperFieldId -= fieldsWidth;
  } while (upperFieldId >= 0);

  return newState;
};

export const compareTwoFieldsByColor = (
  id,
  fieldsState,
  direction,
  callBack,
) => {
  const { fieldsWidth } = gameConfig;
  const firstField = fieldsState[id];

  // check fields by color
  switch (direction) {
    case 'FROM_LEFT': {
      const secondField = fieldsState[id - 1];
      if (secondField && compareColorsOfFields(firstField, secondField)) {
        // The colors are the same
        callBack(secondField.id);
      }
      // the Colors are't the same
      callBack(null);
      break;
    }
    case 'FROM_RIGHT': {
      const secondField = fieldsState[id + 1];
      if (secondField && compareColorsOfFields(firstField, secondField)) {
        callBack(secondField.id);
      }
      callBack(null);
      break;
    }
    case 'FROM_TOP': {
      const secondField = fieldsState[id - fieldsWidth];
      if (secondField && compareColorsOfFields(firstField, secondField)) {
        callBack(secondField.id);
      }
      callBack(null);
      break;
    }
    case 'FROM_BOTTOM': {
      const secondField = fieldsState[id + fieldsWidth];
      if (secondField && compareColorsOfFields(firstField, secondField)) {
        callBack(secondField.id);
      }
      callBack(null);
      break;
    }
    default:
      return callBack(null);
  }
  return callBack(null);
};
