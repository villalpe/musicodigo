import axios from 'axios'
import { 
    BLOG_LIST_REQUEST, 
    BLOG_LIST_SUCCESS, 
    BLOG_LIST_FAIL,
    BLOG_DETAILS_REQUEST,
    BLOG_DETAILS_SUCCESS,
    BLOG_DETAILS_FAIL,
    BLOG_CREATE_DETAILS_REQUEST,
    BLOG_CREATE_DETAILS_SUCCESS,
    BLOG_CREATE_DETAILS_FAIL,

    BLOG_DELETE_REQUEST,
    BLOG_DELETE_SUCCESS,
    BLOG_DELETE_FAIL,

    BLOG_CREATE_REQUEST, 
    BLOG_CREATE_SUCCESS,
    BLOG_CREATE_FAIL, 
    BLOG_CREATE_RESET,

    BLOG_UPDATE_REQUEST,
    BLOG_UPDATE_SUCCESS,
    BLOG_UPDATE_FAIL,
    BLOG_UPDATE_RESET,

} from '../constants/blogConstants'

export const listBlogs = (keyword = '') => async (dispatch) => {
    try{
        dispatch({type: BLOG_LIST_REQUEST })
        const { data } = await axios.get(`/api/blogs${keyword}`)

        dispatch({
            type: BLOG_LIST_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: BLOG_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })        
    }
}

export const listBlogDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: BLOG_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/blogs/${id}`)

        dispatch({
            type: BLOG_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: BLOG_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })        
    }
}

export const createBlogDetail = (blogId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOG_CREATE_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/blogs/${blogId}/bdetails/`,
            review,
            config
        )

        dispatch({
            type: BLOG_CREATE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BLOG_CREATE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteBlog = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOG_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/blogs/delete/${id}/`,
            config
        )

        dispatch({
            type: BLOG_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: BLOG_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createBlog = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOG_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/blogs/create/`,
            {},
            config
        )

        dispatch({
            type: BLOG_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: BLOG_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateBlog = (blog) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOG_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/blogs/update/${blog._id}/`,
            blog,
            config
        )

        dispatch({
            type: BLOG_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({ 
            type: BLOG_DETAILS_SUCCESS, 
            payload: data
        })


    } catch (error) {
        dispatch({
            type: BLOG_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}