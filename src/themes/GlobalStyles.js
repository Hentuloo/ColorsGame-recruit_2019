import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
html {
  font-size: 62.5%;
}

body {
  min-height: 100vh;
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 4rem;
  background-color: black;
  color: white;
}
`;
