import axios from "axios";

let http = axios.create({
    baseURL: 'http://localhost:8080/',
    withCredentials: true,
    headers:{
        'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
    },
    transformRequest:[function(data){
        let newData = '';
        for (let k in data) {
            if(data.hasOwnProperty(k) === true){
                newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
            }
        }
        return newData.slice(0, -1); // 移除最后一个 '&'
    }]
});

function apiAxois(method, url, params, response){
    http({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
    }).then(function(res){
        response(res);
    }).catch(function(err){
        response(err);
    })
}

export default {
    get: function(url, params, response) {
        return apiAxois('GET', url, params, response)
    },
    post: function(url, params, response) {
        return apiAxois('POST', url, params, response)
    },
    put: function(url, params, response) {
        return apiAxois('PUT', url, params, response)
    },
    delete: function(url, params, response) {
        return apiAxois('DELETE', url, params, response)
    },
}