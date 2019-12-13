import React, { Component } from "react";


class CommentMaker extends Component {
  state = {
    newComment: "",
    isLoading: true
  };

  handleSubmit = event => {
    event.preventDefault();
    const { newComment } = this.state;
    this.props.postNewComment(newComment);
    this.setState({ newComment: ""});
  };

  handleChange = event => {
    this.setState({ newComment: event.target.value });
  };

  render() {
    return (
      <div>
        <div className="comments-form">
          <form className="comment-form" onSubmit={this.handleSubmit}>
            <label>
              Comment
              <textarea required
                rows="18"
                cols="6"
                onChange={this.handleChange}
                value={this.state.newComment}
              ></textarea>
            </label>
            <input type="submit"></input>
          </form>
        </div>
      </div>
    );
  }
}

export default CommentMaker;
