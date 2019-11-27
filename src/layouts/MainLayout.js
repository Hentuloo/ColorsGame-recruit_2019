import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'themes/GlobalStyles';

import theme from 'themes/mainTheme';

const MainLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div>{children}</div>
    </ThemeProvider>
  );
};

export default MainLayout;
