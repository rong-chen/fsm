import service from "@/utils/request.js";
export const clients_create =(data)=>{
    return service({
        url:"/clients/client",
        method:"post",
        data
    })
}
