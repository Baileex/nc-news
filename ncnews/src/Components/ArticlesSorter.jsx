import React, { Component } from "react";
import "../component-css/ArticleSorter.css"

class ArticlesSorter extends Component {
  state = {
    sort_by: "created_at",
    order: "desc"
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("submit!");
    const { sort_by, order } = this.state;
    const { fetchArticles } = this.props;
    fetchArticles(sort_by, order);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="sortOptions">
        <select className="options" name="sort_by" onChange={this.handleChange}>
          <option value="created_at">Date Created</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
        <select className="options" name="order" onChange={this.handleChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <button className="options button">Sort</button>
      </form>
    );
  }
}

export default ArticlesSorter;
