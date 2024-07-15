import {defineStore} from "pinia";
import {onMounted, ref} from "vue";

export const userInfoStore = defineStore("userInfo",()=>{

    let token = ref({
        r:"",
        a:""
    })
    token.value.r= localStorage.getItem("rToken")
    token.value.a= localStorage.getItem("aToken")

    return {
        token
    }
})
