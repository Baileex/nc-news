import axios from "axios";

export const getTopics = () => {
  return axios
    .get("https://ncnewsjb.herokuapp.com/api/topics")
    .then(({ data }) => {
      return data.topics;
    });
};

export const getArticles = (topic_slug, sort_by, order, limit, page ) => {
  return axios
    .get("https://ncnewsjb.herokuapp.com/api/articles", {
      params: {
       topic: topic_slug,
       sort_by: sort_by,
       order: order,
       limit: limit,
       p: page
      }
    })
    .then(({ data }) => {
      return data
    });
};

export const getSingleArticle = article_id => {
  return axios
    .get(`https://ncnewsjb.herokuapp.com/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    });
};

export const getComments = (article_id, limit, p) => {
  return axios
    .get(`https://ncnewsjb.herokuapp.com/api/articles/${article_id}/comments`, {params: {
      limit: limit,
      p: p
    }})
    .then(({ data }) => {
      return data;
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

export const patchVotes = (votes, id, object) => {
  return axios.patch(`https://ncnewsjb.herokuapp.com/api/${object}/${id}`, { inc_votes: votes});
}

export const fetchUsers = () => {
  return axios.get("https://ncnewsjb.herokuapp.com/api/users").then(({data}) => {
    return data.users
  });
}

export const getUserByUsername = (username) => {
  return axios.get(`https://ncnewsjb.herokuapp.com/api/users/${username}`).then(({data}) => {
    return data.user;
  });
}