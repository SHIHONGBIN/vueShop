import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/User.vue'
import Rols from '../components/Rols/Rols.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component: Home,
      redirect:'/welcome',
      children:[{
        path:'/welcome',
        component:Welcome
      },{
        path:'/user',
        component:User
      },{
        path: '/rols',
        component: Rols
      },]
    }
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



router.beforeEach((to, from, next)=>{
  //to 将要访问路径
  //from 从哪里路径过来
  //next 是一个函数 下一步 放行
  if(to.path == '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})


export default router
