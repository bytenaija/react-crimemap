import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MapView from "./views/MapView";
import "./App.css";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path="/" component={MapView} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
