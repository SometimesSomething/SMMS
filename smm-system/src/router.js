import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import( './views/login/Login.vue')
    },
    {
      path: '/',
      component: () => import( './views/index/index.vue'),
      children:[
        {
          path:"",
          component: () => import( './views/Home/Home.vue'),
        },
        {
          path: '/accountadd',
          name: 'AccountAdd',
          component: () => import( './views/AccountAdd/AccountAdd.vue')
        },
        {
          path: '/accountmanagement',
          name: 'AccountManagement',
          component: () => import( './views/AccountManagement/AccountManagement.vue')
        },
        {
          path: '/goodsadd',
          name: 'GoodsAdd',
          component: () => import( './views/GoodsAdd/GoodsAdd.vue')
        },
        {
          path: '/goodsmanagement',
          name: 'GoodsManagement',
          component: () => import( './views/GoodsManagement/GoodsManagement.vue')
        },
        {
          path: '/passwordmodify',
          name: 'PasswordModify',
          component: () => import( './views/PasswordModify/PasswordModify.vue')
        },
        {
          path: '/salestatistics',
          name: 'SaleStatistics',
          component: () => import( './views/SaleStatistics/SaleStatistics.vue')
        },
        {
          path: '/commoditystorage',
          name: 'commoditystorage',
          component: () => import( './views/CommodityStorage/CommodityStorage.vue')
        },
        {
          path: '/inventorymanagement',
          name: 'inventorymanagement',
          component: () => import( './views/InventoryManagement/InventoryManagement.vue')
        },
        {
          path: '/saleslist',
          name: 'saleslist',
          component: () => import( './views/SalesList/SalesList.vue')
        },
        {
          path: '/commodityout',
          name: 'commodityout',
          component: () => import( './views/CommodityOut/CommodityOut.vue')
        },
        {
          path: '/productreturn',
          name: 'productreturn',
          component: () => import( './views/ProductReturn/ProductReturn.vue')
        }
      ]
    },
   
  ]
})
