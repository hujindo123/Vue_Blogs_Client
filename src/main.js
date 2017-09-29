//The Vue build version to load with the `import` command
//(runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import App from './App';

import { axios, QiNiu } from '@/router/config';

import Home from '@/views/index';
import itemGame from '@/components/index/itemGame';
import itemNews from '@/components/index/itemNews';

import register from '@/views/register/register';
import active from '@/views/register/active';
import hasActive from '@/views/register/hasActive';
import needActive from '@/views/register/needActive';

import login from '@/views/login/login';
import forget from '@/views/login/forgetPassword';
import updatePass from '@/views/login/updatePass';
import NotEmail from '@/views/login/notAvailableEmail';
import article from '@/views/article';

import user from '@/views/user/index';
import userCenter from '@/views/user/userCenter';
import writerArticle from '@/views/user/writerArticle';
import updateMessage from '@/views/user/updateMessage';
import upload from '@/views/user/upload';

Vue.prototype.QiNiu = QiNiu;
Vue.prototype.axios = axios;
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/itemGame',
    children: [
      {
        path: '/itemGame',
        component: itemGame
      },
      {
        path: '/itemNews',
        component: itemNews
      }
    ]
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/active',
    component: active
  },
  {
    path: '/hasActive',
    component: hasActive
  },
  {
    path: '/needActive',
    component: needActive
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/forget',
    component: forget
  },
  {
    path: '/updatePass',
    component: updatePass
  },
  {
    path: '/NotEmail',
    component: NotEmail
  },
  {
    path: '/article',
    component: article
  },
  {
    path: '/user',
    component: user,
    redirect: '/userCenter',
    children: [
      {
        path: '/userCenter',
        component: userCenter
      },
      {
        path: '/updateMessage',
        component: updateMessage
      },
      {
        path: '/writerArticle',
        component: writerArticle
      }]
  },
  {
    path: '/upload',
    component: upload
  }

];

const router = new VueRouter({
  routes,
  mode: 'history'
});

FastClick.attach(document.body);

Vue.config.productionTip = false;

/*eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box');
