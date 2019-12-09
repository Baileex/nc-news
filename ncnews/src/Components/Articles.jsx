import React, { Component } from 'react';
import * as api from "../api";
import styled from "styled-components"
import {Link} from "@reach/router"
import {Votes, ArticleList, Card } from '../articledesign'


class Articles extends Component {
  state = {
    articles: []
  }

  componentDidMount = () => {
  this.fetchArticles()
  }

  fetchArticles = () => {
    api.getArticles().then(articles => {
      this.setState({articles: articles})
    })
  }
  
  render() {
    const {articles} = this.state
    return (
      <div className="container-articles">
        <ArticleList>
          {articles.map(article => {
          return (
            <Card key={article.article_id}>
              <h2>{article.title}</h2>
              <p>{article.topic}</p>
              <h4>{article.author}</h4>
              <Votes>{article.votes}</Votes>
              <h4>{article.created_at}</h4>
              <h4>{article.comment_count}</h4>
              <Link to={`/articles/${article.article_id}`}>
              <button>Read More...</button> 
              </Link>
              
            </Card>
          ); 
        })} 
        </ArticleList>
      </div>
    );
  }
}

export default Articles;