import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { store, persistor } from './store';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import IncidentView from './views/IncidentView';
import ProtectedRoute from './helpers/ProtectedRoute';
import Rewards from './views/Rewards';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/incident/:incidentId"
              component={IncidentView}
            />
            <ProtectedRoute
              exact
              path="/rewards"
              component={Rewards}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
