import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { store, persistor } from './store';
import MapView from './views/MapView';
import Login from './views/Login';
import Register from './views/Register';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path="/" component={MapView} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
