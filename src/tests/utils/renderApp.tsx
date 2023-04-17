import { render, screen } from '@testing-library/react';
import App from '../../pages/App';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import ErrorBoundary from '../../components/ErrorBoundary';
import Error from '../../pages/Error';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import theme from '../../theme';
import { setSessionState } from '../../redux/workItems';
import { ISessionState } from '../../redux/workItems/types';

const defaultSession: ISessionState = {
  isAuthenticating: false,
  isAdmin: false,
  user: {
    uid: 'user123',
    displayName: 'John Doe',
    email: 'john@doe.com',
    avatar: null
  }
};

const renderApp = (session?: typeof defaultSession) => {
  function initializeState() {
    setSessionState(session || defaultSession);
  }

  return render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store} serverState={initializeState}>
          <ErrorBoundary onError={console.log} errorComponent={<Error />}>
            <App />
          </ErrorBoundary>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export { screen };
export default renderApp;
