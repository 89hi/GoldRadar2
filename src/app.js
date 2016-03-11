



var Vue = require('vue')
var Vuestrap = require('vue-strap');
var VueRouter = require('vue-router')
Vue.use(VueRouter)

// console.log('Vue.http.options :',Vue.http.options)

// Vue.http.interceptors.push({

//     request: function (request) {
//         request.crossOrigin = true
//         return request;
//     },

//     response: function (response) {
//         return response;
//     }

// });

import app from './vue/main.vue'
// var Login = Vue.extend(require('./vue/login/index.vue'))
import Login from './vue/login/index.vue'
import Main from './vue/main/index.vue'
import rememberService from './vue/login/services/remember.service.js'
import router from  './vue/common/services/router.service.js'
import PZContent from './vue/main/components/pzcontent.vue' 
import ZBContent from './vue/main/components/zbcontent.vue' 
// import Main from './main.vue';
// import Login from './login/index.vue';

// var Login = Vue.extend({})

// var router = new VueRouter({
//     hashbang: true //hash路由
// })

//路由表
router.map({
    '/login': {
        component: Login
    },
    '/main':{
        component:Main, 
        subRoutes:{
          '/samepz':{
            component:PZContent
          },
          '/samezb':{
            component:ZBContent
          }  
        }
    }
    // '/B': {
    //     component: require('./views/list.vue'),
    //     //子路由
    //     subRoutes:{
    //         'detail/:giftId': {
    //             name: 'detail', //具名路由
    //             component: require('./views/detail.vue')
    //         }
    //     }
    // },
    // '/C': {
    //     component: require('./views/tab.vue')
    // },
    // '/D': {
    //     component: require('./views/paged/paged.vue'),
    //     subRoutes: {
    //         '/toonelevel': {
    //             component: require('./views/paged/toonelevel.vue')
    //         },
    //         '/vfor': {
    //             component: require('./views/paged/vfor.vue')
    //         },
    //         '/vmodel': {
    //             component: require('./views/paged/vmodel.vue')
    //         }
    //     }
    // } 
})

//默认/重定向到home页
router.redirect({ 
    '/':"/login",
    '/main':'/main/samepz' 
})
//注册路由切换前
//使底部菜单栏在一级路由切换时一直保持显示
//在二级页时隐藏
router.beforeEach(function (transition) {
    var toPath = transition.to.path,
    isLogin = rememberService.isLogin()
    if(toPath === '/login' && isLogin){
        router.go('/main')
        return
    }else if(toPath !== '/login' && !isLogin){
        router.go('/login')
        return
    }
    // if(toPath.replace(/[^/]/g,"").length>1){
    //     router.app.isIndex = false;
    // }else{
    //     router.app.isIndex = true;
    // }
    transition.next()
})
//注册路由切换后
router.afterEach(function (transition) {
    // console.log('成功浏览到: ' + transition.to.path)
    // $.refreshScroller();
    console.log('afterEach')
})

router.start(app, '#app')
// 暴漏路由调试接口
window.router = router;
