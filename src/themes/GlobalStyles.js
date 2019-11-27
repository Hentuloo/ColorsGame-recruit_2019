import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
html {
  font-size: 62.5%;
}

body {
  min-height: 100vh;
  margin: 0px;
  padding: 0px;
  overflow-x: hidden;
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  background-color: white;
  color: black;
  @media (min-width: 460px){
  font-size: 1.2rem;
  }
  @media (min-width:1024px){
  font-size: 1.4rem;
  }
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  margin: 0px;
  padding: 0px;
  font-weight: normal;
}

ol,
ul {
  list-style: none;
}
`;
