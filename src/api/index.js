import axios from "../utils/http/axios"

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

export const adminUser = (data) => {
    return axios({
        url: "api/adminUser",
        method: "post",
        data,
        config: {}
    })
}