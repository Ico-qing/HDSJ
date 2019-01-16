import Vue from 'vue'
import App from './App.vue'
import router from './router'

import'mint-ui/lib/style.css'

Vue.config.productionTip = false

//小图标
//import './lib/mui/css/iconfont.css'

// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标

// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'

//滑动引入
// import vuescroll from 'vuescroll'
// Vue.use(vuescroll)
// import 'vuescroll/dist/vuescroll.css'
//0.1:引入Vuex
import Vuex from "vuex"
//0.2:注册Vuex组件
Vue.use(Vuex)
//0.3:创建Vuex实例对象
var store = new Vuex.Store({
  state:{
    isLogin:false,
    carPanelDate:[],
    cartCount:0   //购物车中商品数量
  },
  mutations:{     // 修改共享数据方法
    signin(state){
      state.isLogin=true
    },
    signout(state){
      state.isLogin=false
    },
    increment(state,count){
       state.cartCount+=count
    },
    substract(state){ state.cartCount--},
    clear(state){state.cartCount = 0},
    addCartpanelDate(state,data){
      //判断购物车是否增加过
      var cart = true
      state.carPanelDate.forEach(result=>{
        if(result.id===data.id){
          result.count++
          cart=false
        }
      })
      if(cart){
        var goodsData = data
        Vue.set(goodsData,'count',1)
        state.carPanelDate.unshift(goodsData)
      }
    }
  },
  getters:{      //获取共享数据方法
     optCartCount:function(state){
       return state.cartCount;
     }
  }
})

//1.引入mint-ui  Header组件
import {Header,Button,Swipe,SwipeItem} from 'mint-ui'
//2.注册Header组件
Vue.component(Header.name,Header);
Vue.component(Button.name,Button);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);

//3.引入axios库
import axios from "axios"
//3.2:跨域保存session值
axios.defaults.withCredentials=true
//3.3:注册组件
Vue.prototype.axios=axios

//vue-resource是与后台进行交互的一个插件，相当于ajax
//4.引入vue-resource库
import VueResource from "vue-resource";
//5.注册vue-resource库
Vue.use(VueResource)
//6.配置vue-resource常见属性
//6.1设置请求服务器的根目录
Vue.http.options.root = "http://127.0.0.1:3000/";
//6.2:全局设置post 时候表单 application/x-www-form-urlencoded
//将提交的数据进行转码的操作
Vue.http.options.emulateJSON = true;
//6.3跨域访问保存session值选项
Vue.http.options.withCredentials = true

//7.创建日期类型过滤器
//val：原先日期对象
Vue.filter("datatimeFilter",function(val){
  //7.1:创建日期对象
  var data = new Date(val)
  //7.2:获取年月日时分秒
  var y = data.getFullYear();
  var m = data.getMonth()+1;
  var d = data.getDate();
  var h = data.getHours();
  var mi = data.getMinutes();
  var s = data.getSeconds();
  //7.3:月日格式判断 07 08 09 10
  m<10&&(m="0"+m);
  d<10&&(d="0"+d);
  //7.4:拼接字符串返回
  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
})

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
