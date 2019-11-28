import React from 'react';
import styled, { css } from 'styled-components';

import gameConfig from 'config/gameConfig';

const Wrapper = styled.div`
  position: relative;
  background-color: ${({ color }) => color};
  ${({ kill }) =>
    kill &&
    css`
      background-color: ${({ theme }) => theme.color.white};
    `}
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    left: 0%;
    top: 0%;
    box-shadow: inset 0px 0px 25px 5px rgba(0, 0, 0, 0.75);
    opacity: 0;
    transition: opacity 0.2s ease-in;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
`;

const Field = ({ onClick, colorId, kill }) => {
  const { color } = gameConfig.colors.find(({ id }) => id === colorId);

  return (
    <Wrapper
      kill={kill}
      onClick={onClick}
      color={color}
      role="button"
      tabIndex="0"
    >
      {/* {index} */}
    </Wrapper>
  );
};

export default Field;
