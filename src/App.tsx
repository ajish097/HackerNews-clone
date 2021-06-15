import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./components/Header/Header";
import Posts from "./components/Posts/Posts";
import CommentSection from "./components/CommentSection/CommentSection";

export default function App() {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/">
          <Posts />
        </Route>
        <Route exact path="/comments/:id">
          <CommentSection />
        </Route>
      </Switch>
    </div>
  );
}
