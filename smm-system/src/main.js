import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios';

router.beforeEach((to,from,next)=>{
  let token=window.localStorage.getItem("token");
  if(token){
    next();
  }else{
    if(to.path === "/login"){
      next();
    }else{
      return next({path:"/login"});
    }
  }
});

Vue.prototype.axios = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.axios = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
