import axios from 'axios';
import {navigate} from '@reach/router';

const request = axios.create({ baseURL: 'https://robins-nc-news.herokuapp.com/api' })

export const createTopic = (slug, description, imgURL) => {
    return (
        request
        .post('./topics', {slug, description, imgURL} )
        .then(data => {
            return data
        })
        .catch(navigate('/errorpage', {state: { code: 500, msg: 'Something went wrong, sorry!'}}))
    )
}
export const createUser = (username, name, avatar_url) => {
    return (
        request
            .post('/users', { username, name, avatar_url })
            .then(data => data)
            .catch(navigate('/errorpage', {state: { code: 500, msg: 'Something went wrong, sorry!'}}))
    )
}
export const deleteItem = (id, article) => {
    return (
        request
            .delete(article ? `/articles/${id}` : `/comments/${id}`)
            .then(res => {
                return { response: res, info: 'item deleted' }
            })
            .catch(navigate('/errorpage', {state: { code: 500, msg: 'Something went wrong, sorry!'}}))
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
            .catch(navigate('/errorpage', {state: { code: 500, msg: 'Something went wrong, sorry!'}}))
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
            .catch(navigate('/errorpage', {state: { code: 500, msg: 'Something went wrong, sorry!'}}))
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
            .catch(navigate('/errorpage', {state: { code: 500, msg: 'Something went wrong, sorry!'}}))
    )
}
export const fetchSingleArticle = (id) => {
    return (
        request
            .get(`/articles/${id}`)
            .then(({ data }) => {
                return data.article
            })
            .catch(navigate('/errorpage', {state: { code: 500, msg: 'Something went wrong, sorry!'}}))
    )
}
export const fetchSingleUser = (username) => {
    return (
        request
            .get(`/users/${username}`)
            .then(({data}) => {
                return data
            })
            .catch(navigate('/errorpage', {state: { code: 500, msg: 'Something went wrong, sorry!'}}))
    )
}
export const fetchTopics = () => {
    return (
        request
            .get(`/topics/`)
            .then(({ data }) => {
                return data.topics
            })
            .catch(navigate('/errorpage', {state: { code: 500, msg: 'Something went wrong, sorry!'}}))
    )
}
export const postArticle = (title, topic, username, body) => {
    return (
        request
            .post(`/articles`, { title, topic, username, body })
            .then(({ data }) => {
                return data
            })
            .catch(navigate('/errorpage', {state: { code: 500, msg: 'Something went wrong, sorry!'}}))
    )
}
export const postComment = (id, body, username) => {
    return (
        request
            .post(`articles/${id}/comments`, { body: body, username: username })
            .then(({ data }) => {
                return data
            })
            .catch(navigate('/errorpage', {state: { code: 500, msg: 'Something went wrong, sorry!'}}))
    )
}
export const vote = (id, increment, comment) => {
    return (
        request
            .patch(comment ? `/comments/${id}` : `/articles/${id}`, { inc_votes: increment })
            .then(({ data }) => {
                return data
            })
            .catch(navigate('/errorpage', {state: { code: 500, msg: 'Something went wrong, sorry!'}}))
    )
}
