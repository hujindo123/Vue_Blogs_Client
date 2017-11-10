import Home from 'src/views/index';
import itemGame from 'src/components/index/itemGame';
import itemNews from 'src/components/index/itemNews';

import register from 'src/views/register/register';
import active from 'src/views/register/active';
import needActive from 'src/views/register/needActive';

import login from 'src/views/login/login';
import forget from 'src/views/login/forgetPassword';
import updatePass from 'src/views/login/updatePass';

import article from 'src/views/article';
import user from 'src/views/user/index';
import userCenter from 'src/views/user/userCenter';
/*import writerArticle from 'src/views/user/writerArticle';
import updateMessage from 'src/views/user/updateMessage';
import upload from 'src/views/user/upload';*/

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
    path: '/active/:email/:code',
    component: active
  },
  {
    path: '/needActive/:account',
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
    path: '/updatePass/:email/:code',
    component: updatePass
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
      }
     /*{
        path: '/updateMessage',
        component: updateMessage
      },
      {
        path: '/writerArticle',
        component: writerArticle
      }*/
    ]
  }
  /*{
    path: '/upload',
    component: upload
  }*/
];
export default routes;
