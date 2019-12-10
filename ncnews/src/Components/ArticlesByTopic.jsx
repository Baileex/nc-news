import React, { Component } from "react";
import Articles from "./Articles";

class ArticlesByTopic extends Component {
  render() {
    const { topic_slug } = this.props;
    return (
      <div>
        <Articles topic_slug={topic_slug} />
      </div>
    );
  }
}

export default ArticlesByTopic;
