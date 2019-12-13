import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
import {
  ArticleList,
  Card,
  Title,
  Topic,
  Author,
  Date,
  Readmore,
  Commentcount
} from "../articledesign";
import LoadingIcon from "./LoadingIcon";
import ArticlesSorter from "./ArticlesSorter";
import ErrorPage from "./ErrorPage";
import formatDate from "../utils/utils";
import Voter from "./Voter";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    error: null,
    searchTerm: "",
    page: 1,
    limit: 10,
    maxPages: null
  };

  componentDidMount = () => {
    this.fetchArticles();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.topic_slug !== this.props.topic_slug || prevState.page !== this.state.page) {
      this.fetchArticles();
    }
  };

  fetchArticles = (sort_by, order) => {
    const { topic_slug } = this.props;
    const {page, limit} = this.state;
    api
      .getArticles(topic_slug, sort_by, order, limit, page)
      .then(({articles, total_count}) => {
        let max = Math.ceil(total_count / limit);
        this.setState({ articles: articles, isLoading: false, maxPages: max});
      }).catch(({ response }) => {
        this.setState({
          error: {
            msg: response.data.msg,
            status: response.status
          },
          isLoading: false
        });
      });
  };

  stateUpdater = searchInput => {
    this.setState({ searchTerm: searchInput });
  };


  changePage = (direction) => {
   this.setState(currentState => {
     return {page: currentState.page + direction}
   })
  }

  render() {
    console.log(this.state)
    const { articles, isLoading, error, searchTerm } = this.state;
    const { loggedUser } = this.props;
    if (isLoading === true) return <LoadingIcon />;
    if (error) return <ErrorPage status={error.status} msg={error.msg} />;
    const regEx = RegExp(searchTerm, "gi") 
    let filtered;
    if (searchTerm === "") {
      filtered = articles;
    } else {
      filtered = articles.filter((article) => {
        return regEx.test(article.title)
      })
    }
    return (
      <div className="body">
      <div className="section-header">
        <div className="sorter">
          <ArticlesSorter fetchArticles={this.fetchArticles} />
        </div>
        <Pagination changePage={this.changePage} page={this.state.page} maxPages={this.state.maxPages}/>
        <div className="search-bar">
          <SearchBar stateUpdater={this.stateUpdater} />
        </div>
        </div>
        <div className="container-articles">
          <ArticleList articles={articles} filtered={filtered} margin={1000}>
            {filtered.map(article => {
              return (
                <Card key={article.article_id}>
                  <Title>{article.title}</Title>
                  <Topic>#{article.topic}</Topic>
                  <Author>By: {article.author}</Author>
                  {article.author !== loggedUser && (
                    <Voter
                      id={article.article_id}
                      object="articles"
                      votes={article.votes}
                    />
                  )}
                  <Date>{formatDate(article.created_at)}</Date>
                  <Commentcount>Comments: {article.comment_count}</Commentcount>
                  <Readmore>
                    <Link to={`/articles/${article.article_id}`}>
                      Read More...
                    </Link>
                  </Readmore>
                </Card>
              );
            })}
          </ArticleList>
        </div>
      </div>
    );
  }
}

export default Articles;
