import axios from 'axios'

const request = axios.create({ baseURL: 'https://robins-nc-news.herokuapp.com/api' })

export const fetchArticles = (topic, author, sort_by) => {
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
export const fetchSingleArticle = (id) => {
    return (
        request
            .get(`/articles/${id}`)
            .then(({ data }) => {
                return data.article
            })
            .catch(err => console.log(err))
    )
}
export const fetchComments = (id) => {
    return (
        request
            .get(`/articles/${id}/comments`)
            .then(({ data }) => {
                console.log(data.comments)
                return data.comments
            })
            .catch(err => console.log(err))
    )
}

export const fetchTopics = () => {
    return (
        request
            .get(`/topics/`)
            .then(({ data }) => {
                return data.topics
            })
            .catch(err => console.log(err))
    )
}
export const fetchAuthors = () => {
    return (
        request
            .get(`/users?limit=100`)
            .then(({ data }) => {
                return data.users
            })
            .catch(err => console.log(err))
    )
}


// export default { getArticles }