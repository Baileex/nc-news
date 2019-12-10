import React, { Component } from 'react';
import * as api from "../api";
import { CommentVotes } from "../articledesign";
import formatDate from "../utils/utils";
import CommentMaker from "./CommentMaker";

class CommentsList extends Component {
  state = {
    comments: [],
    isLoading: true,
    error: null
  };
  componentDidMount = () => {
    this.fetchComments();
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.id !== this.props.id) {
  //     this.fetchComments();
  //   }
  // }

  fetchComments = () => {
    const { article_id } = this.props;
    api
      .getComments(article_id)
      .then(comments => {
        this.setState({ comments: comments, isLoading: false });
      })
      .catch(({ response }) => {
        console.dir(response);
        this.setState({
          error: {
            msg: response.data.msg,
            status: response.status
          },
          isLoading: false
        });
      });
  };

  postNewComment = newComment => {
    const { article_id, user } = this.props;
    api
      .postComment(article_id, user, newComment)
      .then(postedComment => {
        const updatedComments = [postedComment, ...this.state.comments];
        this.setState({ comments: updatedComments });
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

  removeComment = comment_id => {
    this.setState(({ comments }) => {
      return {
        comments: comments.filter(comment => comment.comment_id !== comment_id)
      };
    });
    api.deleteComment(comment_id).catch(({ response }) => {
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
    const { comments } = this.state;
    const {user } = this.props
    return (
      <div>
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
                      <h6>{formatDate(comment.created_at)}</h6>

                      <CommentVotes>{comment.votes}</CommentVotes>
                    </span>
                  </div>
                  <p>{comment.body}</p>
                </div>
                {comment.author === user && (
                  <button
                    onClick={() => this.removeComment(comment.comment_id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <CommentMaker postNewComment={this.postNewComment} />
      </div>
    );
  }
}

export default CommentsList;