import {createRouter, createWebHashHistory, createWebHistory} from "vue-router"
import {userInfoStore} from "@/pinia/user.js";

const routes = [
    {path: "/",disabledShow:true,redirect: "/clients_login"},
    {
        path: '/oauth_login',
        name: 'oauth_login',
        disabledShow:true,
        component: ()=>import("@/view/oauth_login/oauth_login.vue"),
    },{
        path: '/clients_login',
        name: 'clients_login',
        disabledShow:true,
        component: ()=>import("@/view/clients/clients_login/clients_login.vue"),
    },{
        path: '/clients_layout',
        name: 'clients_layout',
        label:"密钥",
        redirect: {name:'clients_home'},
        component: ()=>import("@/view/clients/clients_layout/clients_layout.vue"),
        children:[
            {
                path: 'clients_home',
                name: 'clients_home',
                label:"密钥申请",
                component: ()=>import("@/view/clients/clients_home/clientsHome.vue"),
            },{
                path: 'manage',
                label:"密钥管理",
                name: 'clients_manage',
                component: ()=>import("@/view/clients/clients_manage/clientsManage.vue"),
            }
        ]
    },
    { path: '/:pathMatch(.*)',disabledShow:true,name:"NotFound", component: ()=>import("@/view/notFound/notFound.vue"), }
]
const router = createRouter({
    history:createWebHistory(),
    routes
})

function isValidURL(url) {
    const urlRegex = /^(https?:\/\/)?((([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}|localhost)|(\d{1,3}\.){3}\d{1,3})(:\d{1,5})?(\/.*)?$/;
    return urlRegex.test(url);
}
router.beforeEach((to, from, next) => {
    if(to.path === '/oauth_login'){
        // 提取哈希片段中的参数
        const hash = window.location.hash.substring(1);
        const hashParams = new URLSearchParams(hash);
        const clientId = hashParams.get('client_id') || to.query.client_id;
        const redirectUrl = to.query.redirect_url;
       if(isValidURL(redirectUrl) && clientId){
           next()
           return
       }else{
           next({
               path:"/NotFound"
           })
           return;
       }
    }else{
        const userInfo = userInfoStore()
        if(userInfo.token.r && userInfo.token.a){
            next()
        }else{
           if(to.path !=="/clients_login"){
               next({
                   name:"clients_login"
               })
           }else{
               next()
           }
        }
    }
})

export default router

