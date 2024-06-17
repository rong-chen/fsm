<template>
  <div class="form-container drag-mod">
   <div class="box3d" :class="{
     transformY:isRegister
   }">
     <div class="login-box boxItem" >
       <p class="title">胖狐用户认证中心</p>
       <form class="form no-drag" @submit.prevent.stop="handleSubmit">
         <input v-model="formData.username" type="text" class="input " placeholder="手机号码" />
         <input
             v-model="formData.password"
             type="password"
             class="input "
             placeholder="密码"
         />
         <button class="form-btn-register form-btn loginBtn" @click.prevent="registerBtn">注册</button>
         <button class="form-btn loginBtn" type="submit">登录</button>
       </form>
     </div>
     <div class="register-box  boxItem">
       <p class="title">胖狐用户注册中心</p>
       <form class="form no-drag" @submit.prevent.stop="registerHandleSubmit">
         <el-carousel ref="carouselRef" height="250px" :interval="5000" indicator-position="none" :autoplay="false"  arrow="never">
           <el-carousel-item  >
             <div style="width: 100%">
               <input  v-model="registerForm.username" type="text" class="input " placeholder="用户名" />
               <input
                   v-model="registerForm.password"
                   type="password"
                   class="input inputStyle"
                   placeholder="密码"
               />
               <button class="form-btn-register form-btn loginBtn inputStyle" @click.prevent="back">退出</button>
               <button class="form-btn loginBtn inputStyle"  @click.prevent="next()">下一步</button>
             </div>
           </el-carousel-item>
           <el-carousel-item  >
             <div style="width: 100%">
               <input  v-model="registerForm.nickname" type="text" class="input " placeholder="昵称" />
               <input
                   v-model="registerForm.phone"
                   type="password"
                   class="input inputStyle"
                   placeholder="手机号码"
               />
               <button class="form-btn-register form-btn loginBtn inputStyle" @click.prevent="back">退出</button>
               <button class="form-btn loginBtn inputStyle"  @click.prevent="next()">下一步</button>
             </div>
           </el-carousel-item>
           <el-carousel-item  >
             <div style="width: 100%">
               <input  v-model="registerForm.email" type="text" class="input " placeholder="邮箱" />
               <div style="display: flex">
                 <input
                     v-model="registerForm.code"
                     type="password"
                     class="input inputStyle"
                     style="width: 200px"
                     placeholder="验证码"
                 />
                   <button @click.prevent="receiveCode" style="margin-left: 10px" class="form-btn loginBtn inputStyle">
                       验证码
                   </button>

               </div>
               <button class="form-btn-register form-btn loginBtn inputStyle" @click.prevent="back">退出</button>
               <button class="form-btn loginBtn inputStyle" type="submit">完成</button>
             </div>
           </el-carousel-item>
         </el-carousel>
       </form>
     </div>
   </div>

  </div>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import {Login} from "@/api/login.js";
import {useRoute,useRouter} from "vue-router";
import {SendEmailCode} from "@/api/register.js";
import {ElMessage} from "element-plus";
let registerForm = ref({
  "username":"",
  "password":"",
  "phone":"",
  "nickname":"",
  "email":"",
  "code":""
})
let formData=ref({
  username:"",
  password:"",
  redirect:""
})
const carouselRef =ref(null)
const back=()=>{
  isRegister.value=false
  carouselRef.value.setActiveItem(0)
  registerForm.value = {
    "username":"",
    "password":"",
    "phone":"",
    "nickname":"",
    "email":"",
    "code":""
  }
}
onMounted(()=>{
  formData.value.redirect = route.query.redirect_url
})
const receiveCode= async ()=>{
     let {code} = await SendEmailCode({
       email:registerForm.value.email
     })
  if(code === 200){
    ElMessage.success("发送成功")
  }
}
const registerHandleSubmit=()=>{
  console.log("注册")
}
const  next =()=>{
  carouselRef.value.next()
}

const registerBtn =()=>{
  console.log("registerBtn")
  isRegister.value =true
}
let isRegister=ref(false)
const route = useRoute()
const router = useRouter()
const handleSubmit = async (event) => {
  if(formData.value.username && formData.value.password){
    if(!formData.value.redirect){
      await router.push({
        path: "/NotFound",
      })
    }
    await Login(formData.value)
  }else{
    alert("请输入账号和密码")
  }
}

</script>
<style scoped>
.login-box{
  z-index: 2;
}

.boxItem{
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  padding: 10px 30px 40px;
  box-sizing: border-box;
}
.transformY {
  transform: rotateY(180deg) !important;
  z-index: 4;
}
.box3d{
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  transform-style: preserve-3d;
  transform: rotateY(0deg);
  transition: transform 0.6s;
  box-shadow: 1px 1px 10px #ececec;
  border:1px solid #ececec;
  width: 360px;
  height: 400px;
}

.register-box{
  transform: rotateY(180deg);
  z-index: 1;
}
.form-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;position: relative;
  background-image: url(@/assets/loginBackground.jpg);
  border-radius: 10px;
  padding: 20px 30px;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  box-sizing: border-box;
}
.inputStyle{
  margin-top: 18px;
  width: 100%;
}
.title {
  text-align: center;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
  Verdana, sans-serif;
  margin: 40px 0 30px 0;
  font-size: 28px;
  font-weight: 800;
  display: flex;
  color: #522323;
  align-items: center;
  justify-content: center;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 15px;
  margin-top: 40px;

}

.input {
  border-radius: 10px;
  border: 1px solid #c0c0c0;
  outline: 0 !important;
  box-sizing: border-box;
  padding: 8px 15px;
  height: 40px;
  width: 100%;
}



.form-btn {
  padding: 10px 15px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
  Verdana, sans-serif;
  border-radius: 20px;
  border: 0 !important;
  outline: 0 !important;
  background: teal;
  color: white;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-weight: bold;
}

.form-btn-register{
  border: 1px solid teal;
  background-color: white;
  color: black;
}
.form-btn:active {
  box-shadow: none;
}

#cbx:checked ~ .cbx {
  border-color: transparent;
  background: #6871f1;
  animation: jelly 0.6s ease;
}

#cbx:checked ~ .cbx:after {
  opacity: 1;
  transform: rotate(45deg) scale(1);
}

@keyframes jelly {
  from {
    transform: scale(1, 1);
  }

  30% {
    transform: scale(1.25, 0.75);
  }

  40% {
    transform: scale(0.75, 1.25);
  }

  50% {
    transform: scale(1.15, 0.85);
  }

  65% {
    transform: scale(0.95, 1.05);
  }

  75% {
    transform: scale(1.05, 0.95);
  }

  to {
    transform: scale(1, 1);
  }
}

.hidden-xs-up {
  display: none !important;
}

.tabbar-title {
  position: fixed;
  top: 5px;
  right: 10px;
  cursor: pointer;
}
</style>
