import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./components/header/header";
import Posts from "./components/posts/posts";

export default function App() {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/">
          <Posts />
        </Route>
      </Switch>
    </div>
  );
}
