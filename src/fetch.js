import axios from 'axios'
//import Qs from 'qs'
//Axios传参的两种方式，表单数据和json字符串: https://blog.csdn.net/u013253924/article/details/81772820
//Axios使用说明：http://axios-js.com/zh-cn/docs/index.html

let config = {
    baseURL: '/api',
    transformRequest: [
        function (data) {
			let ret = JSON.stringify(data)
            return ret
        }
    ],
    transformResponse: [
        function (data) {
            return data
        }
    ],
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000,
    responseType: 'json'
};

axios.interceptors.response.use(function(res){
    //相应拦截器
    return res.data;
});


export function get(url) {
    return axios.get(url, config)
}

export function post(url, data) {
    return axios.post(url, data, config)
}