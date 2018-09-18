// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/base.css'
import store from './vuex/store'
import VueRouter from 'vue-router'
import routes from './routes'
import axios from 'axios'
import Vuex from 'vuex'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
stockInit(Highcharts)
Vue.use(HighchartsVue)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueRouter)

axios.interceptors.request.use(
  config => {
    let access_token_msg=localStorage.getItem('user');
     if(access_token_msg){
      access_token_msg = JSON.parse(access_token_msg);
     let  access_token=access_token_msg.access_token; 
     store.commit('login',access_token);
     }
    
    let token=`${store.state.token}`;
      if (token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
          config.headers.Authorization = token;
      }
      return config;
  },
  err => {
      return Promise.reject(err);
  });
  axios.interceptors.response.use(function(response){

    if(response.data.code=='40001'){//具体的判断token失效的参数
      localStorage.removeItem('user');

    }else{
        return response
    }
  }, function (error) {
    return Promise.reject(error);
  });





Vue.prototype.$http = axios
Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  
  let user = JSON.parse(localStorage.getItem('user'));

  if (!user ) {
    store.commit('changestatus',false);
         
    next()
  } else {
    store.commit('login',user.access_token);
    store.commit('getuser',user.client.mobile);
    store.commit('changestatus',true);

    next()
  }
})
/* eslint-disable no-new */
new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')
