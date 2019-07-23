import axios from 'axios'

const request = axios.create({ baseURL: 'https://robins-nc-news.herokuapp.com/api' })

export const createTopic = (slug, description, imgURL) => {
    return (
        request
        .post('./topics', {slug, description, imgURL} )
        .then(data => {
            console.log(data)
            return data
        })
        .catch(console.dir)
    )
}
export const createUser = (username, name, avatar_url) => {
    return (
        request
            .post('/users', { username, name, avatar_url })
            .then(data => data)
            .catch(console.dir)
    )
}
export const deleteItem = (id, article) => {
    return (
        request
            .delete(article ? `/articles/${id}` : `/comments/${id}`)
            .then(res => {
                return { response: res, info: 'item deleted' }
            })
            .catch(console.dir)
    )
}
export const fetchArticles = (topic, author, sort_by, order, page, limit) => {
    return (
        request
            .get('/articles', {
                params: {
                    topic: topic,
                    author: author,
                    sort_by: sort_by,
                    order: order,
                    p: page,
                    limit: limit
                }
            })
            .then(({ data }) => {
                return data
            })
            .catch(err => console.log(err))
    )
}
export const fetchAuthors = (sort_by, order, page, limit) => {
    return (
        request
            .get(`/users`, {
                params : {
                    sort_by: sort_by,
                    order: order,
                    p: page,
                    limit: limit
                }
            })
            .then(({ data }) => {
                return data.users
            })
            .catch(err => console.log(err))
    )
}
export const fetchComments = (id, limit, page, sort_by, order) => {
    return (
        request
            .get(`/articles/${id}/comments`, {
                params : {
                    sort_by: sort_by,
                    order: order,
                    p: page,
                    limit: limit
                }
            })
            .then(({ data }) => {return data.comments})
            .catch(err => console.dir(err))
    )
}
export const fetchSingleArticle = (id) => {
    return (
        request
            .get(`/articles/${id}`)
            .then(({ data }) => {
                return data.article
            })
            .catch(err => console.dir(err))
    )
}
export const fetchSingleUser = (username) => {
    return (
        request
            .get(`/users/${username}`)
            .then(({data}) => {
                return data
            })
            .catch(err => console.dir(err))
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
export const postArticle = (title, topic, username, body) => {
    return (
        request
            .post(`/articles`, { title, topic, username, body })
            .then(({ data }) => {
                return data
            })
            .catch(console.dir)
    )
}
export const postComment = (id, body, username) => {
    return (
        request
            .post(`articles/${id}/comments`, { body: body, username: username })
            .then(({ data }) => {
                return data
            })
            .catch(console.dir)
    )
}
export const vote = (id, increment, comment) => {
    return (
        request
            .patch(comment ? `/comments/${id}` : `/articles/${id}`, { inc_votes: increment })
            .then(({ data }) => {
                return data
            })
            .catch(err => console.log(err))
    )
}
