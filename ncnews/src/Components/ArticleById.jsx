import React, { Component } from "react";
import * as api from "../api";
import { Votes } from "../articledesign";
import CommentMaker from "./CommentMaker";
import LoadingIcon from "./LoadingIcon";
import CommentDeleter from "./CommentDeleter";

class ArticleById extends Component {
  state = {
    article: [],
    comments: [],
    user: "jessjelly",
    isLoading: true
  };

  componentDidMount = () => {
    this.fetchArticleById();
    this.fetchComments();
  };

  fetchArticleById = () => {
    const { article_id } = this.props;
    api.getSingleArticle(article_id).then(article => {
      this.setState({ article: article, isLoading: false });
    });
  };

  fetchComments = () => {
    const { article_id } = this.props;
    api.getComments(article_id).then(comments => {
      this.setState({ comments: comments, isLoading: false });
    });
  };

  postNewComment = newComment => {
    const { article_id, loggedUser } = this.props;
    api.postComment(article_id, loggedUser, newComment).then(postedComment => {
      const updatedComments = [postedComment, ...this.state.comments];
      this.setState({ comments: updatedComments });
    });
  };

  removeComment = comment_id => {
    console.log('deleting')
    this.setState(({ comments }) => {
      return {
        comments: comments.filter(comment => comment.comment_id !== comment_id)
      };
    })
    api.deleteComment(comment_id);
  };

  render() {
    const { article, comments, isLoading, user } = this.state;
    if (isLoading === true) return <LoadingIcon />;
    return (
      <article>
        <h1 className="entry-title">{article.title}</h1>
        <h6 className="posted-date">{article.created_at}</h6>
        <h4>By: {article.author}</h4>
        <p className="entry-content">{article.body}</p>
        <Votes>{article.votes}</Votes>
        <h4>Comments: {article.comment_count}</h4>
        <ul>
          {comments.map(comment => {
            return (
              <li className="comment" key={comment.comment_id}>
                <div className="comment-body flex justify-content-between">
                  <div className="comment-wrap">
                    <div className="comment-author flex flex-wrap align-items-center">
                      <span className="fn">
                        <h6>{comment.author}</h6>
                      </span>

                      <span className="comment-meta">
                        <h6>{comment.created_at}</h6>
                      </span>
                    </div>
                    <p>{comment.body}</p>
                  </div>
                  {comment.author === user && <button onClick={() => this.removeComment(comment.comment_id)} >Delete</button>}
                </div>
              </li>
            );
          })}
        </ul>
        <CommentMaker postNewComment={this.postNewComment} />
      </article>
    );
  }
}

export default ArticleById;
