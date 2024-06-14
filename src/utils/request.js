import axios from "axios";

const service = axios.create({
    baseURL:"/api",
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
        window.location.href = resp.data.data.redirect
    }else{
        if(resp.data.code === 200){
            return resp.data
        }else{
            console.log(resp.data)
        }
    }
},(err)=>{
    return Promise.reject(err)
})

export default service
