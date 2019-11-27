import React, { useState } from 'react';
import styled from 'styled-components';

import gameConfig from 'config/gameConfig';
import { createAllFields } from './Utilities';
import Field from './Field';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ columnsCount }) => columnsCount}, 1fr);
  text-align: center;
  width: 98%;
  margin: 15px auto;
`;

const Chessboard = ({ className }) => {
  const [fieldsState, setFieldsState] = useState(createAllFields()); // array of fields

  const { fieldsWidth } = gameConfig;

  const handleFieldClick = index => {
    const clickedField = fieldsState[index];
    console.log(clickedField);
    setFieldsState(fieldsState);
  };

  return (
    <Wrapper className={className} columnsCount={fieldsWidth}>
      {fieldsState.map(({ id, colorId }, index) => (
        <Field
          key={id}
          index={id}
          colorId={colorId}
          onClick={() => handleFieldClick(index)}
        />
      ))}
    </Wrapper>
  );
};

export default Chessboard;
