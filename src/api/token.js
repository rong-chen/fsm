import service from "@/utils/request.js";
export const RefreshAToken =(params)=>{
    return service({
        url:"/clients_token/refresh",
        method:"get",
        params
    })
}
