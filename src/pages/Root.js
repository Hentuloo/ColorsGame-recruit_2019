import React from 'react';
import styled from 'styled-components';

import MainLayout from 'layouts/MainLayout';

const Text = styled.span`
  color: white;
  background-color: black;
`;

function Root() {
  return (
    <MainLayout>
      <Text>Hello world</Text>
    </MainLayout>
  );
}

export default Root;
