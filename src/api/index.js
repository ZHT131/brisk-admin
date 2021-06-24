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