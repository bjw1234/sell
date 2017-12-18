// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import 'common/stylus/index.styl'; // 样式文件

// 1.定义组件
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

// 全局注册
Vue.use(VueRouter);
Vue.use(VueResource);
// 2.定义路由
const routes = [
  {path: '/', redirect: 'goods'},    // 重定向
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller}
];
// 3.创建router实例
const router = new VueRouter({
  routes
});

// 4.注入路由
/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: {App}
});
