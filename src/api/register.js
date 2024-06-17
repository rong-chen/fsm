import service from "@/utils/request.js"
export const SendEmailCode =(data)=>{
    return service({
        url:"/email/send",
        method:"post",
        data
    })
}
