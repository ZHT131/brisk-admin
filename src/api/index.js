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
        method: "post",
        data,
        config: {}
    })
}