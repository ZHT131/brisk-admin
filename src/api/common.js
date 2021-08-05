import axios from "../utils/http/axios";
//公共请求
export function comReq(url, method, data) {
  return axios({
    url: url,
    method: method,
    data,
    config: {},
  });
}
