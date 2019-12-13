import React, { Component } from 'react';
import * as api from "../api";
import formatDate from "../utils/utils";
import CommentMaker from "./CommentMaker";
import Voter from "./Voter"
import Pagination from "./Pagination";
import ErrorPage from "./ErrorPage"

class CommentsList extends Component {
  state = {
    comments: [],
    isLoading: true,
    error: null,
    page: 1,
    maxPages: null,
    limit: 4
  };
  componentDidMount = () => {
    this.fetchComments();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchComments();
    }
  }

  changePage = (direction) => {
   this.setState(currentState => {
     return {page: currentState.page + direction}
   })
  }

  fetchComments = () => {
    const { article_id } = this.props;
    const {limit, page} = this.state
    api
      .getComments(article_id, limit, page)
      .then(({comments, total_count}) => {
        let max = Math.ceil(total_count / limit);
        this.setState({ comments: comments, isLoading: false, maxPages: max });
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
    const { comments, error } = this.state;
    const {user } = this.props
    if (error) return <ErrorPage status={error.status} msg={error.msg} />;
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
                    <br></br>
                    <span className="comment-meta">
                      <h6>{formatDate(comment.created_at)}</h6>
                      <br></br>
                      <Voter id={comment.comment_id}
                      object="comments" 
                      votes={comment.votes}></Voter>
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
      <Pagination changePage={this.changePage}page={this.state.page} maxPages={this.state.maxPages}/>
      <CommentMaker postNewComment={this.postNewComment} />
      </div>
    );
  }
}

export default CommentsList;