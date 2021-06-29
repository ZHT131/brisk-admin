import axios from "../utils/http/axios"

export const mokeGet = (data) => {
    return axios({
        url: "api/news",
        method: "get",
        data,
        config: {}
    })
}
export const mokePost = (data) => {
    return axios({
        url: "api/news",
        method: "post",
        data,
        config: {}
    })
}
export const login = (data) => {
    return axios({
        url: "api/login",
        method: "post",
        data,
        config: {}
    })
}
export const authRoutes = (data) => {
    return axios({
        url: "api/authRoutes",
        method: "get",
        data,
        config: {}
    })
}