/*
 * @Author: Michael 
 * @Date: 2017-10-13 20:43:04 
 * @Last Modified by: Michael
 * @Last Modified time: 2017-10-13 20:47:34
 */

import Vue from 'vue';
import Router from 'vue-router';

const Home = (resolve) => {
  require(['@/components/Home'], resolve);
}

const Upload = (resolve) => {
  require(['@/components/Upload'], resolve);
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
  }]
});

export default router;
