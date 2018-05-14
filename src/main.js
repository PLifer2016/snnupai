// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';


import Layout from './components/layout'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import IndexPage from './pages/index'
import LoginPage from './pages/login'
import RegPage from './pages/register'
import LoveWallPage from './pages/loveWall'
import TradeDetail from './pages/tradeDetail'
import fzfpage from './pages/404page'
import trade from './pages/trade'

Vue.config.productionTip = false;

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(iView)

//require('./mock.js');

let router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/register',
      component: RegPage
    },
    {
      path: '/loveWall',
      component: LoveWallPage
    },
    {
      path: '/trade',
      component: trade
    },
    {
      // path: '/tradeDetail',
      path: '/tradeDetail/:tradeId',
      component: TradeDetail,
    },
    {
      // path: '/tradeDetail',
      path: '/404',
      component: fzfpage,
    },
  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    Layout,
  },
  template: '<Layout/>'
})
