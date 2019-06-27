import axios from 'axios'

const request = axios.create({ baseURL: 'https://robins-nc-news.herokuapp.com/api' })


export const addArticle = (title, topic, username, body) => {
    return (
        request
            .post(`/articles`, { title, topic, username, body })
            .then(({ data }) => {
                return data
            })
            .catch(console.dir)
    )
}
export const addComment = (id, body, username) => {
    return (
        request
            .post(`articles/${id}/comments`, { body: body, username: username })
            .then(({ data }) => {
                return data
            })
            .catch(console.dir)
    )
}
export const fetchArticles = (topic, author, sort_by, order) => {
    return (
        request
            .get('/articles', {
                params: {
                    topic: topic,
                    author: author,
                    sort_by: sort_by,
                    order: order
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
export const vote = (id, increment, comment) => {
    return (
        request
            .patch(comment ? `/comments/${id}` : `/articles/${id}`, { inc_votes: increment })
            .then(({ data }) => {
                console.log(data)
                return data
            })
            .catch(err => console.log(err))
    )
}