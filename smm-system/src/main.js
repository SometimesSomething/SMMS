import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import request from "@/API/request"

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

Vue.prototype.request = request;
Vue.config.productionTip = false;
Vue.use(ElementUI);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
