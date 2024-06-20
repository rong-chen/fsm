import {createRouter, createWebHashHistory, createWebHistory} from "vue-router"

const routes = [{
    path: "/",
    redirect: "/login"
},
    {
        path: '/login',
        name: 'login',
        component: ()=>import("@/view/login/login.vue"),
    },
    { path: '/:pathMatch(.*)',name:"NotFound", component: ()=>import("@/view/notFound/notFound.vue"), }
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
    if(to.path === '/login'){
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
    }
    next()
})

export default router

