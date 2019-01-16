import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
import Test from "./components/Test.vue"
import ListContainer from "./components/ListContainer.vue"
import Home from "./components/tabbar/Home.vue"
import Find from "./components/tabbar/Find.vue"
import Card from "./components/tabbar/Card.vue"
import GoodsInfo from "./components/good/GoodsInfo.vue"
import Login from "./components/login/Login.vue"
import Logout from './components/login/Logout.vue'
import NewsList from "./components/news/NewsList.vue"
import NewsInfo from "./components/news/NewsInfo.vue"
import Comment from "./components/sub/Comment.vue"
import Person from "./components/tabbar/Person.vue"
import Register from './components/login/Register'
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/Register',component:Register},
    {path:'/Logout',component:Logout},
    {path:'/Person',component:Person},
    {path:'/Comment',component:Comment},
    {path:'/NewsInfo',component:NewsInfo},
    {path:'/NewsList',component:NewsList},
    {path:'/Card',component:Card},
    {path:'/Login',component:Login},
    {path:'/GoodsInfo',component:GoodsInfo},
    {path:'/Find',component:Find},
    {path:'/',redirect:"/Home"},
    {path:'/Test',component:Test},
    {path:'/ListContainer',component:ListContainer},
    {path:'/Home',component:Home}
  ],
  linkActiveClass:"mui-active"
})
