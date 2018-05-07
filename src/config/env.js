/**
 * Created by Administrator on 2017/11/21.
 */
import Vue from 'vue';

export const baseUrl = 'http://localhost:3001'; //接口地址
export const imgURL = 'http://172.16.0.71:3000'; //图片地址

Vue.prototype.imgURL = baseUrl;
Vue.prototype.baseUrl = baseUrl;
