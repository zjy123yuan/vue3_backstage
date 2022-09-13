import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect:'goods',
    children:[
      {
        path: 'goods',
        name: 'goods',
        meta:{
          isshow:true,
          title:'商品列表'
        },
        component: () => import(/* webpackChunkName: "goods" */ '../views/menulist/GoodsView.vue')
      },
      {
        path: 'user',
        name: 'user',
        meta:{
          isshow:true,
          title:'用户管理'
        },
        component: () => import(/* webpackChunkName: "user" */ '../views/menulist/UserView.vue')
      },
      {
        path: 'role',
        name: 'role',
        meta:{
          isshow:true,
          title:'身份管理'
        },
        component: () => import(/* webpackChunkName: "role" */ '../views/menulist/RoleView.vue')
      },
      {
        path: 'authority',
        name: 'authority',
        meta:{
          isshow:false,
          title:'权限管理'
        },
        component: () => import(/* webpackChunkName: "authority" */ '../views/menulist/AuthorityView.vue')
      }
    ]  
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  const token:string|null =localStorage.getItem('token')
  if(!token&&to.path!=='/login'){
    next('/login')
  }else{
    next()
  }
})

export default router
