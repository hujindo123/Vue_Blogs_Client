import Vue from 'vue';
import {AjaxPlugin} from 'vux';
Vue.prototype.imageUrl = 'http://ovdstxl7y.bkt.clouddn.com/';
Vue.use(AjaxPlugin);
let baseURL;
if (process.env.NODE_ENV === 'development') {
  Vue.prototype.baseURL = 'http://172.16.0.61:3001';
  baseURL = 'http://172.16.0.61:3001';
} else if (process.env.NODE_ENV === 'production') {
  Vue.prototype.baseURL = 'http://47.93.236.234';
  baseURL = 'http://47.93.236.234';
}
export default async (url, data, method) => {
  data['userId'] = sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : '';
  if (method === 'GET') {
    return new Promise(function (resolve, reject) {
      Vue.http({
        method: method,
        url: baseURL + url,
        params: data
      }).then(response => {
        resolve(response.data);
      }, (error) => {
        reject(error.data);
      });
    });
  } else if (method === 'POST') {
    return new Promise(function (resolve, reject) {
      Vue.http({
        method: method,
        url: baseURL + url,
        data: data
      }).then(response => {
        resolve(response.data);
      }, (error) => {
        reject(error.data);
      });
    });
  }
};

