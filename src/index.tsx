import React from 'react';
import { render } from 'react-dom';
import {
  createMuiTheme,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core/styles';
import App from './App';
import { MessageProvider } from './context/MessageContext';
import { UserContextProvider } from './context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
  },
});

render(
  <UserContextProvider>
    <MessageProvider>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <Router>
            <App />
          </Router>
        </StylesProvider>
      </ThemeProvider>
    </MessageProvider>
  </UserContextProvider>,
  document.getElementById('root')
);
