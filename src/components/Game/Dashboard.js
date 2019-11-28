import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 10px 0px;
  background-color: ${({ theme }) => theme.color.black[0]};
  color: ${({ theme }) => theme.color.white[0]};
`;
const Text = styled.span`
  font-size: ${({ theme }) => theme.fs.xl};
  word-spacing: 8px;
`;
const StyledButton = styled(Button)`
  width: 80%;
  height: 60px;
`;

const Dashboard = ({ className, resetGameScore, gameScore }) => {
  return (
    <Wrapper className={className}>
      <Text>{`Wynik: ${gameScore}`}</Text>
      <StyledButton type="button" onClick={resetGameScore} title="Zresetuj grę">
        Zresetuj Wynik
      </StyledButton>
    </Wrapper>
  );
};

export default Dashboard;
