import React from 'react';
import styled from 'styled-components';

import Chessboard from './Chessboard';
import Dashboard from './Dashboard';

const StyledChessboard = styled(Chessboard)`
  flex-grow: 1;
`;
const StyledDashboard = styled(Dashboard)`
  height: 60px;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Game = ({ className }) => {
  return (
    <Wrapper className={className}>
      <StyledChessboard />
      <StyledDashboard />
    </Wrapper>
  );
};

export default Game;
