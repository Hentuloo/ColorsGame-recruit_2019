import styled from 'styled-components';

const Button = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.color.red[0]};
  color: ${({ theme }) => theme.color.white[0]};
  font-size: ${({ theme }) => theme.fs.s};
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
`;

export default Button;
