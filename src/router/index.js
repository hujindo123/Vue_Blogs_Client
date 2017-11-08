/*import Home from '@/views/index';
import itemGame from '@/components/index/itemGame';
import itemNews from '@/components/index/itemNews';*/

import register from 'src/views/register/register';
/*import active from 'src/views/register/active';
import hasActive from 'src/views/register/hasActive';*/
import needActive from 'src/views/register/needActive';

import login from 'src/views/login/login';
/*import forget from '@/views/login/forgetPassword';
import updatePass from '@/views/login/updatePass';
import NotEmail from '@/views/login/notAvailableEmail';
import article from '@/views/article';

import user from '@/views/user/index';
import userCenter from '@/views/user/userCenter';
import writerArticle from '@/views/user/writerArticle';
import updateMessage from '@/views/user/updateMessage';
import upload from '@/views/user/upload';*/

const routes = [
/*{
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
  },*/
  {
    path: '/register',
    component: register
  },
/*{
    path: '/active',
    component: active
  },
  {
    path: '/hasActive',
    component: hasActive
  },
 */
  {
    path: '/needActive/:account',
    component: needActive
  },
  {
    path: '/login',
    component: login
  }
/*{
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
  }*/
];
export default routes;
