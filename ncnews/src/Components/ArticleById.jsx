import React, { Component } from 'react';
import * as api from "../api";
import {Votes} from '../articledesign'

class ArticleById extends Component {
  state = {
    article: []
  }

  componentDidMount = () => {
   this.fetchArticleById()
  }

  fetchArticleById = () => {
  const { article_id } = this.props; 
   api.getSingleArticle(article_id).then(article => {
   this.setState({article: article})
   })
  }


  render() {
    const {article} = this.state;
    console.log(article)
    return (
      <article>
        <h1>{article.title}</h1>
        <h4>By: {article.author}</h4>
        <p>{article.body}</p>
        <button>Add Comment</button>
        <Votes>{article.votes}</Votes>
      </article>
    );
  }
}

export default ArticleById;