import axios from "axios";
import {ElMessage} from "element-plus";

const service = axios.create({
    baseURL:import.meta.env.VITE_BASE_API,
    timeout:5000,
    headers: {
        'Content-Type': 'application/json',
    },
})

service.interceptors.request.use((config)=>{
    return config;
},(err)=>{
    return Promise.reject(err)
})

service.interceptors.response.use((resp)=>{
    if(resp.data.code === 302){
        window.open(resp.data.data)
        window.close()
        return resp.data
    }else{
        if(resp.data.code !== 200){
            ElMessage.error(resp.data.msg)
        }
        return resp.data
    }
},(err)=>{
    return Promise.reject(err)
})

export default service
