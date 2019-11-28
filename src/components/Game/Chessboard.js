import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import gameConfig from 'config/gameConfig';
import {
  createAllFields,
  compareColorsOfFields,
  randomColorId,
} from './Utilities';
import Field from './Field';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ columnsCount }) => columnsCount}, 1fr);
  width: 98%;
  max-width: 700px;
  max-height: 650px;
  margin: 15px auto;
  text-align: center;
`;

const Chessboard = ({ className, addToGameScore }) => {
  const { fieldsWidth, poinstForfield, pointsForBadMove } = gameConfig;

  const [fieldsState, setFieldsState] = useState([
    //   {
    //     id
    //     colorId,
    //     kill
    //   }
  ]);
  const [killedFields, setKilledFields] = useState([]);
  const [clicEventFlag, setClickEventFlag] = useState(true);

  const killField = id => {
    const newFieldState = fieldsState;
    newFieldState[id].kill = true;
    setFieldsState([...newFieldState]);
    setKilledFields(killedFields.push(id));
  };
  const refreshKilledFields = () => {
    const newFieldState = fieldsState.map(field => {
      if (field.kill === true) {
        return {
          ...field,
          colorId: randomColorId(),
          kill: false,
        };
      }
      return field;
    });
    setFieldsState(newFieldState);
  };

  const checkTwoFields = (id, direction) => {
    switch (direction) {
      case 'FROM_LEFT': {
        const firstField = fieldsState[id];
        const secondField = fieldsState[id - 1];
        if (secondField && compareColorsOfFields(firstField, secondField)) {
          // The colors are the same
          killField(secondField.id);
          findFieldAround(secondField.id);
          return true;
        }
        // the Colors are't the same
        return false;
      }
      case 'FROM_RIGHT': {
        const firstField = fieldsState[id];
        const secondField = fieldsState[id + 1];
        if (secondField && compareColorsOfFields(firstField, secondField)) {
          killField(secondField.id);
          findFieldAround(secondField.id);
          return true;
        }
        return false;
      }
      case 'FROM_TOP': {
        const firstField = fieldsState[id];
        const secondField = fieldsState[id - fieldsWidth];
        if (secondField && compareColorsOfFields(firstField, secondField)) {
          killField(secondField.id);
          findFieldAround(secondField.id);
          return true;
        }
        return false;
      }
      case 'FROM_BOTTOM': {
        const firstField = fieldsState[id];
        const secondField = fieldsState[id + fieldsWidth];
        if (secondField && compareColorsOfFields(firstField, secondField)) {
          killField(secondField.id);
          findFieldAround(secondField.id);
          return true;
        }
        return false;
      }
      default:
        return null;
    }
  };

  const findFieldAround = id => {
    checkTwoFields(id, 'FROM_LEFT');
    checkTwoFields(id, 'FROM_RIGHT');
    checkTwoFields(id, 'FROM_TOP');
    checkTwoFields(id, 'FROM_BOTTOM');
  };

  const collapseField = id => {
    const newState = fieldsState;

    let startField = id;
    let upperFieldId = id - fieldsWidth;
    // if field is on in first row
    if (upperFieldId <= 0) {
      newState[startField].kill = true;
      setFieldsState(newState);
      return;
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

    setFieldsState(newState);
  };

  const newRound = () => {
    // count points and return to parent component(Game)
    addToGameScore(
      killedFields.length === 0
        ? pointsForBadMove
        : killedFields.length - 1 * poinstForfield,
    );
    // Collapse killed fields
    killedFields.forEach(fieldId => collapseField(fieldId));
    // reset killed fields array
    setKilledFields([]);
    // create new random fields
    refreshKilledFields();
  };

  const handleFieldClick = index => {
    if (clicEventFlag) {
      setClickEventFlag(true);
      const clickedField = fieldsState[index];
      const { id, colorId } = clickedField;
      findFieldAround(id, colorId);

      newRound();
    }
  };

  useEffect(() => {
    if (fieldsState.length === 0) {
      setFieldsState(createAllFields());
    }
  });

  return (
    <Wrapper className={className} columnsCount={fieldsWidth}>
      {fieldsState.map(({ id, colorId, kill }, index) => (
        <Field
          key={id}
          index={id}
          colorId={colorId}
          kill={kill}
          onClick={() => handleFieldClick(index)}
        />
      ))}
    </Wrapper>
  );
};

export default Chessboard;
