// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import Router from 'vue-router';
import Home from './components/Home';
import router from './router';
import './config';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import animate from 'animate.css';

Vue.config.productionTip = false
Vue.use(ElementUI);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
