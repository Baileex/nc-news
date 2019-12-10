import React, { Component } from 'react';
import * as api from "../api";
import {Link} from "@reach/router"
import {Votes, ArticleList, Card } from '../articledesign'
import LoadingIcon from "./LoadingIcon"
import ArticlesSorter from "./ArticlesSorter"
import ErrorPage from './ErrorPage';
import formatDate from "../utils/utils"


class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    error: null
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

    api
      .getArticles(topic_slug, sort_by, order)
      .then(articles => {
        this.setState({ articles: articles, isLoading: false });
      })
      .catch(({response}) => {
        console.dir(response);
        this.setState({
          error: {
            msg: response.data.msg,
            status: response.status
          },
          isLoading: false
        });
      });
  }
  
  render() {
    const {articles, isLoading, error} = this.state
    if (isLoading === true) return <LoadingIcon/>
    if (error) return <ErrorPage status={error.status} msg={error.msg} />;
    return (
      <>
      <ArticlesSorter fetchArticles={this.fetchArticles}/>
      <div className="container-articles">
        <ArticleList>
          {articles.map(article => {
          return (
            <Card key={article.article_id}>
              <h2>{article.title}</h2>
              <p>#{article.topic}</p>
              <h4>By: {article.author}</h4>
              <Votes>{article.votes}</Votes>
              <h6>{formatDate(article.created_at)}</h6>
              <h6>Comments: {article.comment_count}</h6>
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