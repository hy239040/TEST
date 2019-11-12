// 封装axios
import axios from 'axios'

// 创建一个http对象
let baseURL = 'http://www.liulongbin.top:3005/';

// 开发环境的地址: http://www.liulongbin.top:3005/;
// 生产环境地址: 可能不一样
const $axios = axios.create({
    baseURL: baseURL
})
// 封装get
/* 
    @params: url  params

    @return: Promise 
*/
export const get = function (url, params) {
    params = params || {};

    return new Promise(function (resolve, reject) {
        $axios.get(url, {
                params
            })
            .then(res => {
                if (res.data.status === 0) {
                    // 操作数据
                    resolve(res.data)
                } else {
                    alert('获取数据失败');
                }
            })
            .catch(err => {
                reject(err);
                alert('网络异常')
            })
    })

}

// 封装的post 

export const post = (url, params = {}) => {
    return new Promise(function (resolve, reject) {
        $axios.post(url, params)
            .then(res => {
                if (res.data.status === 0) {
                    resolve(res.data);

                }
            })
            .catch(err => {
                reject(err)
                alert('网络异常')
            })
    })
}