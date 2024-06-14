import service from "@/utils/request.js"
export const Login =(data)=>{
 return service({
     url:"/user/login",
     method:"post",
     data
 })
}
