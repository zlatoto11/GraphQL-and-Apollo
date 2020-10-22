import React, { Component, useEffect, useState } from "react";
import { ApolloProvider } from "react-apollo";
import Dashboard from "./components/layout/Dashboard";

import "../src/components/CSSFiles/App.css";
import NavBar from "./components/layout/NavBar";

class App extends Component {
  render() {
    return (
      <div className="app">
        <NavBar />
        <Dashboard />
      </div>
    );
  }
}

export default App;
