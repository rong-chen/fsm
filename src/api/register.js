import service from "@/utils/request.js"
export const SendEmailCode =(data)=>{
    return service({
        url:"/email/send",
        method:"post",
        data
    })
}

export const Register =(data)=>{
    return service({
        url:"/oauth_user/register",
        method:"post",
        data
    })
}
