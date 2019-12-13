import React, { Component } from "react";
import "../component-css/ArticleSorter.css";
import styled from "styled-components";

const Sorter = styled.div`
width: 200px
`;

class ArticlesSorter extends Component {
  state = {
    sort_by: "created_at",
    order: "desc"
  };

  handleSubmit = event => {
    event.preventDefault();
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
      <Sorter>
        <form onSubmit={this.handleSubmit} className="sortOptions">
          <select
            className="options"
            name="sort_by"
            onChange={this.handleChange}
          >
            <option value="created_at">Date Created</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>
          <select className="options" name="order" onChange={this.handleChange}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
          <button className="w3-button w3-light-grey w3-section">Sort</button>
        </form>
      </Sorter>
    );
  }
}

export default ArticlesSorter;
