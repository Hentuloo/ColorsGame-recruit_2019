import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 0px;
  background-color: ${({ theme }) => theme.color.black[0]};
  color: ${({ theme }) => theme.color.white[0]};
`;

const Dashboard = ({ className }) => {
  return (
    <Wrapper className={className}>
      <span>Panel halo</span>
    </Wrapper>
  );
};

export default Dashboard;
