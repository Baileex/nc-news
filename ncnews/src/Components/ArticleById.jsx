import React, { Component } from "react";
import * as api from "../api";
import LoadingIcon from "./LoadingIcon";
import formatDate from "../utils/utils";
import ArticleVoter from "./ArticleVoter";
import ErrorPage from "./ErrorPage"
import CommentsList from "./CommentsList";

class ArticleById extends Component {
  state = {
    article: [],
    user: "jessjelly",
    isLoading: true,
    error: null
  };

  componentDidMount = () => {
    this.fetchArticleById();
  };

  fetchArticleById = () => {
    const { article_id } = this.props;
    api
      .getSingleArticle(article_id)
      .then(article => {
        this.setState({ article: article, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({
          error: {
            msg: response.data.msg,
            status: response.status
          },
          isLoading: false
        });
      });
  };

  render() {
    const { article, isLoading,  error } = this.state;
    if (isLoading === true) return <LoadingIcon />;
    if (error !== null) return <ErrorPage status={error.status} msg={error.msg} />;
    return (
      <article>
        <h1 className="entry-title">{article.title}</h1>
        <div className="voting">
          {/* <Votes>{article.votes}</Votes> */}
          <ArticleVoter />
        </div>

        <h6 className="posted-date">{formatDate(article.created_at)}</h6>

        <h4>By: {article.author}</h4>

        <p className="entry-content">{article.body}</p>
        <h4>Comments: {article.comment_count}</h4>
        <CommentsList article_id={article.article_id} user={this.state.user}/>
      </article>
    );
  }
}

export default ArticleById;
