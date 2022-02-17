import axios from 'axios'
//import Qs from 'qs'
//Axios has 2 methods pass parameter，Form data and json: https://blog.csdn.net/u013253924/article/details/81772820
//Axios manual：http://axios-js.com/zh-cn/docs/index.html

const config = (token) => {
    let objConfig={
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

    if(token) {
        objConfig.headers.token=token;
    }
    return(objConfig);
}

axios.interceptors.response.use(function(res){
    //interceptor
    return res.data;
});


export function get(url, token=null) {
    return axios.get(url, config(token))
}

export function post(url, data, token=null) {
    return axios.post(url, data, config(token))
}
