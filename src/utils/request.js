import axios from "axios";
import {ElMessage} from "element-plus";
import { ElLoading } from 'element-plus'
import {userInfoStore} from "@/pinia/user.js";
import {RefreshAToken} from "@/api/token.js";
import {ref} from "vue";

const userInfo =userInfoStore()
const service = axios.create({
    baseURL:import.meta.env.VITE_BASE_API,
    timeout:5000,
    headers: {
        'Content-Type': 'application/json',
    },
})
let loadingInstance = null
service.interceptors.request.use((config)=>{
    config.headers["Authorization"] =  userInfo.token.a ?? ""
    loadingInstance= ElLoading.service({ fullscreen: true })
    return config;
},(err)=>{
    return Promise.reject(err)
})


let requestList =[]
service.interceptors.response.use((resp)=>{
    setTimeout(()=>{
        loadingInstance.close()
    },200)
    if(resp.data.code === 302){
        window.open(resp.data.data)
        window.close()
        return resp.data
    }else if (resp.data.code === 401){
        localStorage.removeItem('aToken')
        requestList.push(()=>service(resp.config))
        RefreshAToken({
            refresh_token:userInfo.token.r
        }).then(res=>{
            if(res.code ===200){
                userInfo.token.a = res.data
                localStorage.setItem("aToken",res.data)
                requestList.forEach(item=>{
                  item()
                })
                requestList=[]
            }
        })
    }else{
        if(resp.data.code !== 200){
            ElMessage.error(resp.data.msg)
        }
        return resp.data
    }
},(err)=>{
    loadingInstance.close()
    return Promise.reject(err)
})

export default service
