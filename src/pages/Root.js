import React from 'react';
import styled from 'styled-components';

import MainLayout from 'layouts/MainLayout';
import Game from 'components/Game/Game';

const StyledGame = styled(Game)`
  height: 100%;
`;
const Header = styled.header`
  display: block;
  padding: 20px 16px;
  color: ${({ theme }) => theme.color.white[0]};
  background-color: ${({ theme }) => theme.color.black[0]};
  text-transform: uppercase;
  word-spacing: 3px;
`;
const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
`;

function Root() {
  return (
    <MainLayout>
      <Wrapper>
        <Header>
          <h1>Gra w kolory</h1>
        </Header>
        <main>
          <StyledGame />
        </main>
      </Wrapper>
    </MainLayout>
  );
}

export default Root;
