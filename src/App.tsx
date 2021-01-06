
import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import AddWord from './components/AddWord';
import Translate from './components/Translate';
import Youtube from './components/Youtube';

const routes = [
  {
    path: '/',
    Component: AddWord
  },
  {
    path: '/translate',
    Component: Translate
  },
  {
    path: '/youtube-video',
    Component: Youtube
  },
];

const App: React.FC = () => {

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {
            routes && routes.map((val, index) => (
              <Route key={index} path={val.path} exact={val.path === '/' ? true : false} component={val.Component} />
            ))
          }
        </Switch>
      </Router>
    </React.Fragment>

  )
}
export default App