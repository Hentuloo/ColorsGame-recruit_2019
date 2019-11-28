import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import gameConfig from 'config/gameConfig';
import {
  createAllFields,
  stateWithKilledField,
  refreshFieldsState,
  collapseFieldsByKilledFlag,
  compareTwoFieldsByColor,
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
    // change kill flag in field
    const newState = stateWithKilledField(id, fieldsState);
    setFieldsState(newState);
    setKilledFields(killedFields.push(id));
  };

  const refreshKilledFields = () => {
    // refrest color where field have kill:true
    const newState = refreshFieldsState(fieldsState);
    setFieldsState(newState);
  };

  const checkTwoFields = (id, direction) => {
    // check if field in [direction] exist and have the same color then return callback with id or null
    compareTwoFieldsByColor(id, fieldsState, direction, upperFieldId => {
      if (upperFieldId) {
        // kill this field and find next
        killField(upperFieldId);
        findFieldAround(upperFieldId);
      }
    });
  };

  const findFieldAround = id => {
    checkTwoFields(id, 'FROM_LEFT');
    checkTwoFields(id, 'FROM_RIGHT');
    checkTwoFields(id, 'FROM_TOP');
    checkTwoFields(id, 'FROM_BOTTOM');
  };

  const collapseField = id => {
    const newState = collapseFieldsByKilledFlag(id, fieldsState);
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

    setClickEventFlag(true);
  };

  const handleFieldClick = index => {
    if (clicEventFlag) {
      setClickEventFlag(false);
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
