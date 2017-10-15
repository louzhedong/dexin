/*
 * @Author: Michael 
 * @Date: 2017-10-13 20:43:04 
 * @Last Modified by: Michael
 * @Last Modified time: 2017-10-15 20:11:51
 */

import Vue from 'vue';
import Router from 'vue-router';

const Home = (resolve) => {
  require(['@/components/Home'], resolve);
}

const Upload = (resolve) => {
  require(['@/components/Upload'], resolve);
}

const List = (resolve) => {
  require(['@/components/List'], resolve);
}

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/upload',
    name: 'Upload',
    component: Upload
  }, {
    path: '/list',
    name: 'List',
    component: List
  }]
});

export default router;
