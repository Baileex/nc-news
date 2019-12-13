import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header";
import MyNavbar from "./Components/MyNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "@reach/router";
import Homepage from "./Components/Homepage";
import Articles from "./Components/Articles";
import ArticleById from "./Components/ArticleById";
import ArticlesByTopic from "./Components/ArticlesByTopic";
import ErrorPage from "./Components/ErrorPage";
import User from "./Components/User";
import Footer from "./Components/Footer";

class App extends Component {
  state = {
    loggedUser: "jessjelly"
  };
  render() {
    return (
      <div className="App">
        <Header className="header" />
        <MyNavbar className="nav" loggedUser={this.state.loggedUser} />
        <div className="container">
          <Router>
            <Homepage path="/" />
            <User path="/user" loggedUser={this.state.loggedUser}/>
            <Articles path="/articles" loggedUser={this.state.loggedUser} />
            <ArticleById
              path="/articles/:article_id"
              loggedUser={this.state.loggedUser}
            />
            <ArticlesByTopic path="/topics/:topic_slug" />
            <ErrorPage
              default
              status={500}
              msg={"Oops something went wrong!"}
            />
          </Router>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
