import axios from "axios"

export const getTopics = () => {
return axios.get("https://ncnewsjb.herokuapp.com/api/topics").then(({data}) => {
  return data.topics;
})
}

export const getArticles = () => {
  return axios.get("https://ncnewsjb.herokuapp.com/api/articles", {
    params: {
    }
  }).then(({data}) => {
    return data.articles
  })
}

export const getSingleArticle = article_id => {
  return axios.get(`https://ncnewsjb.herokuapp.com/api/articles/${article_id}`).then(({data}) => {
    return data.article;
  });
};