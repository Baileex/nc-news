import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header";
import MyNavbar from "./Components/MyNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "@reach/router";
import Articles from "./Components/Articles";
import ArticleById from "./Components/ArticleById";
import ArticlesByTopic from "./Components/ArticlesByTopic"

class App extends Component {
  state = {
    loggedUser: "jessjelly"
  };
  render() {
    return (
      <div className="App">
        <Header className="header" />
        <MyNavbar className="nav" />
        <Router>
          <Articles path="/articles" />
          <ArticleById
            path="/articles/:article_id"
            loggedUser={this.state.loggedUser}
          />
        <ArticlesByTopic path="/topics/:topic_slug"/>
        </Router>
      </div>
    );
  }
}

export default App;
