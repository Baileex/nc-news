import React from 'react';
import './App.css';
import Header from './Components/Header';
import MyNavbar from './Components/MyNavbar';
import "bootstrap/dist/css/bootstrap.min.css";
import {Router} from "@reach/router"
import Articles from './Components/Articles';
import ArticleById from './Components/ArticleById';

function App() {
  return (
    <div className="App">
      <Header className="header"/>
      <MyNavbar className="nav"/>
      <Router>
      <Articles path="/articles"/>
      <ArticleById path="/articles/:article_id"/>
      </Router>
    </div>
  );
}

export default App;
