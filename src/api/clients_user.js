import service from "@/utils/request.js"

export const ClientsLogin =(data)=>{
    return service({
        url:"/client_user/login",
        method:"post",
        data
    })
}
