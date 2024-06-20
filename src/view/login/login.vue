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
     <div class="register-box  boxItem" style="">
       <div><img  class="backIcon" src="@/assets/back.png" @click="back" alt="返回"></div>
       <p class="title" >胖狐用户注册中心</p>
       <el-form :rules="rules" ref="registerFormRef" :model="registerForm"  label-width="auto">
         <el-carousel ref="carouselRef" @change ="carouselChange" height="130px" :interval="5000" indicator-position="none" :autoplay="false"  arrow="never">
           <el-carousel-item>
             <div style="width: 100%">
               <el-form-item  prop="username">
                  <input v-model="registerForm.username" type="text" class="input " placeholder="用户名" />
               </el-form-item>
               <el-form-item prop="password">
                 <input
                     v-model="registerForm.password"
                     type="password"
                     class="input inputStyle"
                     placeholder="密码"
                 />
               </el-form-item>
             </div>
           </el-carousel-item>
           <el-carousel-item>
             <div style="width: 100%">
               <el-form-item prop="nickname">
               <input  v-model="registerForm.nickname" type="text" class="input " placeholder="昵称" /></el-form-item>
              <el-form-item  prop="phone"><input
                   v-model="registerForm.phone"
                   type="password"
                   class="input inputStyle"
                   placeholder="手机号码"
               /></el-form-item>
             </div>
           </el-carousel-item>
           <el-carousel-item>
             <div style="width: 100%">
               <el-form-item prop="nickname">
                 <input  v-model="registerForm.sex" type="text" class="input " placeholder="性别" /></el-form-item>
               <el-form-item  prop="出生日期">
                  <input
                   v-model="registerForm.birthday"
                   type="password"
                   class="input inputStyle"
                   placeholder="手机号码"
                  />
                </el-form-item>
             </div>
           </el-carousel-item>
           <el-carousel-item>
             <div style="width: 100%">
               <el-form-item prop="email">
                <input  v-model="registerForm.email" type="text" class="input " placeholder="邮箱" />
               </el-form-item>
               <div style="display: flex">
                 <el-form-item prop="code">
                   <input
                     v-model="registerForm.code"
                     type="password"
                     class="input inputStyle"
                     style="width: 200px"
                     placeholder="验证码"
                    /></el-form-item>
                   <button @click.prevent="receiveCode" style="margin-left: 10px;height: 40px" class="form-btn loginBtn inputStyle">
                       验证码
                   </button>
               </div>
             </div>
           </el-carousel-item>
         </el-carousel>
         <button class="form-btn loginBtn inputStyle"  v-if="carouselIndex !== 3"  @click.prevent="next()">下一步</button>
         <button class="form-btn loginBtn inputStyle" v-if="carouselIndex === 3" @click.prevent.stop="registerHandleSubmit">完成</button>
         <button class="form-btn-register form-btn loginBtn inputStyle" v-if="carouselIndex !== 0"   @click.prevent="pre()">上一步</button>
       </el-form>
     </div>
   </div>
  </div>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import {Login , Register} from "@/api/login.js";
import {useRoute,useRouter} from "vue-router";
import {SendEmailCode} from "@/api/register.js";
import {ElMessage} from "element-plus";
const registerFormRef =ref(null)
let registerForm = ref({
  "username":"",
  "password":"",
  "phone":"",
  "nickname":"",
  "email":"",
  "code":"",
  "sex":"",
  "birthday":""
})
let formData=ref({
  username:"",
  password:"",
  redirect_url:"",
  state:"",
  client_id:""
})

function validateUsername(rule, value, callback){
  const regex = /^\d{6,}$/;
  regex.test(value) ? callback() :callback(new Error("请输入六位或者六位以上的数字"))
  return
}
function validateChinesePhoneNumber(rule, value, callback) {
  // 正则表达式，用于匹配中国手机号码
  const regex = /^1[3-9]\d{9}$/;
  regex.test(value) ? callback() :callback(new Error("请输入正确的手机号码(中国)"))
}
function validateEmail(rule, value, callback) {
  // 正则表达式，用于匹配标准的电子邮件地址格式
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  regex.test(value) ? callback() :callback(new Error("请输入正确的邮箱地址"))
}

const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { validator: validateUsername, trigger: 'blur'}
  ],
  password:[
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  phone:[
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { validator: validateChinesePhoneNumber, trigger: 'blur'}
  ],
  nickname:[
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
  ],
  email:[
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {validator: validateEmail, trigger: 'blur'}
  ],
  code:[
    { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
  ],
  sex:[
    { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
  ],
  birthday:[
    { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
  ],
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
  email.value=""
}

onMounted(()=>{
  const hash = window.location.hash.substring(1);
  const hashParams = new URLSearchParams(hash);
  formData.value.client_id= hashParams.get('client_id') || route.query.client_id;
  formData.value.state= hashParams.get('state') || route.query.state;
  formData.value.redirect_url = hashParams.get('redirect_url') || route.query.redirect_url;
})
let email = ref("")
const receiveCode= async ()=>{
    if (!registerFormRef.value) return
    await registerFormRef.value.validateField(['email'], async (valid) => {
      if (valid) {
        let {code} = await SendEmailCode({
          email:registerForm.value.email
        })
        if(code === 200){
          email.value =registerForm.value.email
          ElMessage.success("发送成功")
        }
      }
    })

}

const ruleList =ref({
  "0":['username','password'],
  "1":['nickname','phone'],
  "2":['email','code'],
})


const registerHandleSubmit= async ()=>{
  if (!registerFormRef.value) return
  await registerFormRef.value.validate( async (valid, fields) => {
    if (valid) {
      if(email.value !== registerForm.value.email){
        alert("修改邮箱请重新获取验证码")
      }else{
        let resp = await Register(registerForm.value)
        if(resp.code ===200){
          back()
          ElMessage.success("注册成功")
        }
      }
    }
  })
}

let carouselIndex =ref(0)
const carouselChange = (index)=>{
  carouselIndex.value =index
}

const next = async ()=>{
  if (!registerFormRef.value) return
  await registerFormRef.value.validateField(ruleList.value[carouselIndex.value],(valid) => {
    if (valid) {
      carouselRef.value.next()
    }
  })


}
const pre =()=>{
  carouselRef.value.setActiveItem(carouselIndex.value -1)
}

const registerBtn =()=>{
  isRegister.value =true
}
let isRegister=ref(false)
const route = useRoute()
const router = useRouter()
const handleSubmit = async (event) => {
  if(formData.value.username && formData.value.password){
    if(!formData.value.redirect_url){
      await router.push({
        path: "/NotFound",
      })
    }else{
      await Login(formData.value)
    }
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
  justify-content: center;
  position: relative;
  background-image: url(@/assets/loginBackground.jpg);
  background-size: 100% ,100%;
  border-radius: 10px;
  padding: 20px 30px;
  background-position: center;
  background-repeat: no-repeat;
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
.backIcon{
  position: absolute;
  top: 20px;
  left: 20px;
  width:30px
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
