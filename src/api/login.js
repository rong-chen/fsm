import service from "@/utils/request.js"

export const Login =(data)=>{
 return service({
     url:"/oauth_user/login",
     method:"post",
     data
 })
}

export const Register =(data)=>{
    return service({
        url:"/user/register",
        method:"post",
        data
    })
}
