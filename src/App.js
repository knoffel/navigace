import React from "react";
import MapView from "./components/MapView";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <MapView lat="49.815" lng="18.27" />
            </Route>
            <Route path="/VTN/hh">
              <MapView lat="49.8146818952885" lng="18.268606328072604" />
            </Route>
            <Route path="/VTN/aa">
              <MapView lat="49.81522317725818" lng="18.268702217044886" />
            </Route>
            <Route path="/VTN/ee">
              <MapView lat="49.81484804483436" lng="18.270436935725268" />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
