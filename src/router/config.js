/**
 * Created by Administrator on 2017/9/13.
 */
/**
 * Created by Administrator on 2017/7/28.
 */
import Axios from 'axios';
import qs from 'qs';
const ajax = Axios.create({
  //baseURL: 'http://47.93.236.234:3000'
  baseURL: 'http://172.16.0.61:3001'
});
const QiNiu = 'http://ovdstxl7y.bkt.clouddn.com/';
ajax.defaults.withCredentials = true;
const axios = (method, path, data, callback) => {
  data['userId'] = sessionStorage.getItem('userId');
  if (method === 'get') {
    ajax.get(path, {
      params: data
    }).then((response) => {
      if (response.data.status === -1) {
        alert(response.data.message);
        window.location.href = '/login';
      } else {
        callback(response.data);
      }
    }).catch(function (error) {
      console.log(error);
    });
  } else if (method === 'post') {
    ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    ajax.post(path, qs.stringify(data)).then((response) => {
      if (response.data.status === -1) {
        alert(response.data.message);
        window.location.href = '/login';
      } else {
        callback(response.data);
      }
    }).catch(function (error) {
      console.log(error);
    });
  } else if (method === 'put') {
    ajax.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    ajax.post(path, data).then((response) => {
      debugger;
      if (response.data.status === -1) {
        alert(response.data.message);
        window.location.href = '/login';
      } else {
        callback(response.data);
      }
    }).catch(function (error) {
      console.log(error);
    });
  }
};
const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}
export { axios, QiNiu, formatDate };
