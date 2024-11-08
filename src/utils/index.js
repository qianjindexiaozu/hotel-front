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

function apiAxois(method, url, params){
    return new Promise((resolve, reject) => {
        http({
            method: method,
            url: url,
            data: method === 'POST' || method === 'PUT' ? params : null,
            params: method === 'GET' || method === 'DELETE' ? params : null,
        }).then(function(res){
            resolve(res);
        }).catch(function(err){
            reject(err);
        })
    })
}

// 格式化日期为 yyyy-MM-dd
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default {
    get: function(url, params) {
        return apiAxois('GET', url, params)
    },
    post: function(url, params) {
        return apiAxois('POST', url, params)
    },
    put: function(url, params) {
        return apiAxois('PUT', url, params)
    },
    delete: function(url, params) {
        return apiAxois('DELETE', url, params)
    },
    formatDate,
}