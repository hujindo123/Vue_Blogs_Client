import Vue from 'vue';
import {AjaxPlugin} from 'vux';
let baseUrl = 'http://localhost:3001'; //接口地址;
Vue.prototype.imageUrl = 'http://ovdstxl7y.bkt.clouddn.com/';
Vue.use(AjaxPlugin);

export default async (url, data, method) => {
  const m = method ? 'POST' : 'GET';
  if (!data) {
    data = {};
  }
  data['userId'] = sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : '';
  return new Promise(function (resolve, reject) {
    if (m === 'POST') {
      Vue.http({
        method: m,
        url: baseUrl + url,
        params: data
      }).then(response => {
        if (response.data.code === 0) {
          alert(response.data.message);
        } else {
          resolve(response.data);
        };
        resolve(response.data);
      }, (error) => {
        reject(error.data);
      });
    } else {
      Vue.http({
        method: m,
        url: baseUrl + url,
        params: data
      }).then(response => {
        if (response.data.code === 0) {
          alert(response.data.message);
        } else {
          resolve(response.data);
        };
        resolve(response.data);
      }, (error) => {
        reject(error.data);
      });
    };
  });
};

