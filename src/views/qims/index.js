import Vue from 'vue';
import App from './app.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from '../../vuex/store'
import Vuex from 'vuex'
import routes from '../../routes/qims-routes'




Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.config.debug=true;

//Vue.use(Vuex)


const router = new VueRouter({
    mode:'hash',
    routes,
})



router.beforeEach((to, from, next) => {
    if (to.path == '/'){
        //默认登录
        next({ path: '/qims/login' })
    }else
    {
        next()
    }
    // console.log(  "GOTO =>"+to.path)
    // //该内容每次跳转链接时才会执行
    // //NProgress.start();
    // //先清除已登录信息
    // debugger
    // if (to.path == '/login') {
    //     sessionStorage.removeItem('user');
    // }
    // let user = JSON.parse(sessionStorage.getItem('user'));
    // //无登录信息则跳转到登录
    // if (!user && to.path != '/login') {
    //     sessionStorage.setItem('last',to.path)
    //     console.log("save:"+to.path)
    //     next({ path: '/login' })
    // } else {
    //     next()
    // }
})



//router.afterEach(transition => {
//NProgress.done();
//});



new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')



