import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { TIME_CLOSE_MESSAGE } from './utils/constants';
import { routeConfig } from './routeConfig';
import Login from './views/pages/Login/Login';
import Main from './views/Main';
import { createBrowserHistory } from 'history';
import { authSelector } from 'state/auth/reducer';
import { useSelector } from 'react-redux';
const history = createBrowserHistory();
export function App() {
  const { isAuthenticated } = useSelector(authSelector)
  if (!isAuthenticated) {
    history.push('/login');
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        {isAuthenticated && (
          <Main renderRouteUser={routeConfig} accessToken={isAuthenticated} />
        )}
      </Switch>
      <ToastContainer autoClose={TIME_CLOSE_MESSAGE} />
    </BrowserRouter>
  );
}
