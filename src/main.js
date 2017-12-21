//The Vue build version to load with the `import` command
//(runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
//import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import App from './App';
import routes from './router/index';
import BaiduMap from 'vue-baidu-map';

Vue.use(VueRouter);
Vue.use(BaiduMap, {
  /*Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'toQ1hMwihrrv8wRtKAIqOeq0EaiOGXi9'
});
/**
 * config
 */
Vue.prototype.QiNiu = 'http://ovdstxl7y.bkt.clouddn.com/';

const router = new VueRouter({
  routes,
  mode: 'history'
});

//FastClick.attach(document.body);

Vue.config.productionTip = false;

/*eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box');
