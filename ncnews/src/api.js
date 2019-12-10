import axios from "axios";

export const getTopics = () => {
  return axios
    .get("https://ncnewsjb.herokuapp.com/api/topics")
    .then(({ data }) => {
      return data.topics;
    });
};

export const getArticles = (topic_slug, sort_by, order, author ) => {
  return axios
    .get("https://ncnewsjb.herokuapp.com/api/articles", {
      params: {
       topic: topic_slug,
       sort_by: sort_by,
       order: order,
       author: author
      }
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getSingleArticle = article_id => {
  return axios
    .get(`https://ncnewsjb.herokuapp.com/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    });
};

export const getComments = article_id => {
  return axios
    .get(`https://ncnewsjb.herokuapp.com/api/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    });
};

export const postComment = (article_id, user, newComment) => {
  return axios
    .post(
      `https://ncnewsjb.herokuapp.com/api/articles/${article_id}/comments`,
      { body: newComment, username: user }
    )
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteComment = comment_id => {
  return axios.delete(
    `https://ncnewsjb.herokuapp.com/api/comments/${comment_id}`
  )
}