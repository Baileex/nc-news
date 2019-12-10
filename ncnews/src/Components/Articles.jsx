import React, { Component } from 'react';
import * as api from "../api";
import {Link} from "@reach/router"
import {Votes, ArticleList, Card } from '../articledesign'
import LoadingIcon from "./LoadingIcon"
import ArticlesSorter from "./ArticlesSorter"


class Articles extends Component {
  state = {
    articles: [],
    isLoading: true
  }

  componentDidMount = () => {
  this.fetchArticles()
  }

  componentDidUpdate = (prevProps) => {
   if (prevProps.topic_slug !== this.props.topic_slug) {
     this.fetchArticles()
   }
  }

  fetchArticles = (sort_by, order) => {
    const {topic_slug} = this.props

    api.getArticles(topic_slug, sort_by, order ).then(articles => {
      this.setState({articles: articles, isLoading: false})
    })
  }
  
  render() {
    const {articles, isLoading} = this.state
    if (isLoading === true) return <LoadingIcon/>
    return (
      <>
      <ArticlesSorter fetchArticles={this.fetchArticles}/>
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
              Read More...
              </Link>
              
            </Card>
          ); 
        })} 
        </ArticleList>
      </div>
      </>
    );
  }
}

export default Articles;