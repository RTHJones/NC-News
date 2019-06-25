import axios from 'axios'

const request = axios.create({ baseURL: 'https://robins-nc-news.herokuapp.com/api' })

export const getArticles = (topic, author, sort_by) => {
    return (
        request
            .get('/articles', {
                params: {
                    topic: topic,
                    author: author,
                    sort_by: sort_by
                }
            })
            .then(({ data }) => {
                return data.articles
            })
            .catch(err => console.log(err))
    )
}
export const getSingleArticle = (topic, author, sort_by) => {
    return (
        request
            .get('/articles/:article_id')
            .then(({ data }) => {
                return data.articles
            })
            .catch(err => console.log(err))
    )
}

// export default { getArticles }