import React, { useState } from 'react';
import styled from 'styled-components';

import Chessboard from './Chessboard';
import Dashboard from './Dashboard';

const StyledChessboard = styled(Chessboard)`
  flex-basis: 100%;
`;
const StyledDashboard = styled(Dashboard)`
  height: 60px;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  width: 100%;
`;

const Game = ({ className }) => {
  const [gameScore, setGameScore] = useState(0);

  const addToGameScore = points => {
    setGameScore(gameScore + points);
  };
  const resetGameScore = () => setGameScore(0);

  return (
    <Wrapper className={className}>
      <StyledChessboard addToGameScore={addToGameScore} />
      <StyledDashboard resetGameScore={resetGameScore} gameScore={gameScore} />
    </Wrapper>
  );
};

export default Game;
