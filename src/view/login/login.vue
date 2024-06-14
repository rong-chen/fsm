<template>
  <div class="form-container drag-mod">
    <div class="login-box" >
      <p class="title">胖狐用户认证中心</p>
      <form class="form no-drag" @submit.prevent.stop="handleSubmit">
        <input v-model="formData.username" type="text" class="input inputStyle" placeholder="手机号码" />
        <input
            v-model="formData.password"
            type="password"
            class="input inputStyle"
            placeholder="密码"
        />
        <button class="form-btn-register form-btn loginBtn" @click.prevent="registerBtn">注册</button>
        <button class="form-btn loginBtn" type="submit">登录</button>
      </form>
    </div>
    <div class="register-box">
      注册
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import {Login} from "@/api/login.js";
import {useRoute,useRouter} from "vue-router";
let formData = ref({
  username: '',
  password: '',
  redirect:""
})
onMounted(()=>{
  formData.value.redirect = route.query.redirect_url
})
const registerBtn =()=>{
  console.log("registerBtn")
}
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
  width: 300px;
  box-shadow: 1px 1px 10px #ececec;
  padding: 10px 30px 40px;
  height: 350px;
  border:1px solid #ececec;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px); /* 模糊效果 */
  position: absolute;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.register-box{
  position: absolute;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1px 1px 10px #ececec;
  padding: 10px 30px 40px;
  border:1px solid #ececec;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px); /* 模糊效果 */
  height: 350px;
}
.form-container {
  width: 100%;
  height: 100vh;
  background-image: url(@/assets/loginBackground.jpg);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px 30px;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
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
}

.page-link {
  text-decoration: underline;
  margin: 0;
  text-align: end;
  color: #747474;
  text-decoration-color: #747474;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.page-link-label {
  cursor: pointer;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
  Verdana, sans-serif;
  font-size: 9px;
  font-weight: 700;
  display: flex;
}

.page-link-label:hover {
  color: #000;
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

.sign-up-label {
  margin: 0;
  font-size: 10px;
  color: #747474;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
  Verdana, sans-serif;
}

.sign-up-link {
  margin-left: 1px;
  font-size: 11px;
  text-decoration: underline;
  text-decoration-color: teal;
  color: teal;
  cursor: pointer;
  font-weight: 800;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
  Verdana, sans-serif;
}

.buttons-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20px;
  gap: 15px;
}

.cbx {
  position: relative;
  top: 1px;
  width: 20px;
  height: 20px;
  border: 1px solid #6e6e6e;
  border-radius: 3px;
  vertical-align: middle;
  transition: background 0.1s ease;
  cursor: pointer;
  display: block;
}

.cbx:after {
  content: '';
  position: absolute;
  top: 0px;
  left: 6px;
  width: 7px;
  height: 14px;
  opacity: 0;
  transform: rotate(45deg) scale(0);
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transition: all 0.3s ease;
  transition-delay: 0.15s;
}

.lbl {
  margin-left: 5px;
  vertical-align: middle;
  cursor: pointer;
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
