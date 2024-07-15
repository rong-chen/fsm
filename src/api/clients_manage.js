import service from "@/utils/request.js";

export const getTableData =(params)=>{
    return service({
        url:"/clients_manage/list",
        method:"get",
        params
    })
}
export const deleteRow =(params)=>{
    return service({
        url:`/clients_manage/delete?ids=${params}`,
        method:"delete"
    })
}
