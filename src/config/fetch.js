/**
 * Created by Administrator on 2017/9/13.
 */
import axios from 'axios';
import qs from 'qs';

axios.defaults.withCredentials = true;
axios.defaults.timeout = 50000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://172.16.0.61:3001'; //配置接口地址  'http://47.93.236.234:3000'
//const QiNiu = 'http://ovdstxl7y.bkt.clouddn.com/'
/*
 * let baseUrl = '';
 let routerMode = 'history';
 let imgBaseUrl = 'http://images.cangdu.org/';
 */
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事 (显示load)
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  //_.toast("错误的传参", 'fail');
  return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  //对响应数据做些事
  if (!res.data.status) {
    //_.toast(res.data.msg);
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  //404等问题可以在这里处理
  //_.toast("网络异常", 'fail');
  return Promise.reject(error);
});

export default async (path, data, method) => {
  const m = method ? 'POST' : 'GET';
  if (!data) {
    data = {};
  }
  data['userId'] = sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : '';
  return new Promise(function (resolve, reject) {
    axios({
      method: m,
      url: path,
      params: data
    }).then(response => {
      resolve(response.data);
    }).catch(error => {
      reject(error.data);
    });
  });
};

/*const formatDate = (date, fmt) => {
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
}*/
//export { fetch, QiNiu, formatDate }
