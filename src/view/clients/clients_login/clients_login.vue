<template>
  <div class="form-container drag-mod">
    <div class="box3d" :class="{
     transformY:isRegister
   }">
      <div class="login-box boxItem">
        <p class="title">胖狐开发者平台</p>
        <a-form
            :model="formState"
            ref="formRef"
            name="custom-validation"
            :rules="rules2"
            :label-col="{
            style:{
              width:'100%'
            }
           }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
        >
          <a-form-item name="username">
            <a-input placeholder="登录账号" style="height: 40px;width: 300px" v-model:value="formState.username"/>
          </a-form-item>
          <a-form-item name="password">
            <a-input-password style="height: 40px;width: 300px" placeholder="密码" v-model:value="formState.password"/>
          </a-form-item>
          <a-form-item>
            <div>
              <a-button style="width:300px" type="primary" @click="onFinish">登录</a-button>
              <div style="margin-top: 4px">
                没有账号？
                <span
                    style="color: #00a0ef;font-weight: 500;"
                    @click.prevent="registerBtn"
                >立即注册</span>
              </div>
            </div>
          </a-form-item>
        </a-form>
      </div>
      <div class="register-box  boxItem" style="">
        <div><img class="backIcon" src="@/assets/back.png" @click="back" alt="返回"></div>
        <p class="title">胖狐开发者平台</p>
        <a-form
            name="custom-validation"
            :rules="rules"
            ref="registerFormRef"
            :model="registerForm"
            label-width="auto">
          <el-carousel
              ref="carouselRef"
              @change="carouselChange"
              height="150px"
              :interval="5000"
              indicator-position="none"
              :autoplay="false"
              arrow="never"
          >
            <el-carousel-item>
              <div style="width: 100%">
                <a-form-item name="username">
                  <a-input v-model:value="registerForm.username" style="width: 300px;height:40px" placeholder="用户名"/>
                </a-form-item>
                <a-form-item name="password">
                  <a-input
                      v-model:value="registerForm.password"
                      type="password"
                      style="width: 300px;height:40px"
                      placeholder="密码"
                  />
                </a-form-item>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div style="width: 100%">
                <a-form-item name="nickname">
                  <a-input v-model:value="registerForm.nickname" style="width: 300px;height:40px" placeholder="昵称"/>
                </a-form-item>
                <a-form-item name="phone">
                  <a-input v-model:value="registerForm.phone" style="width: 300px;height:40px" placeholder="手机号码"/>
                </a-form-item>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div style="width: 100%;height: 100%;"
              >
                <a-form-item name="birthday">
                  <a-date-picker
                      style="width: 300px;height: 40px"
                      v-model:value="registerForm.birthday"
                      placeholder="出生日期"
                  />
                </a-form-item>
                <a-form-item name="sex">
                  <a-select
                      v-model:value="registerForm.sex"
                      placeholder="性别"
                      style="width: 300px;height: 40px"
                  >
                    <a-select-option v-for="item in [{label:'男',value:'男'},{label:'女',value:'女'}]"
                                     :value="item.value">{{ item.label }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </div>
            </el-carousel-item>
            <el-carousel-item>
              <div style="width: 100%">
                <a-form-item name="email">
                  <a-input v-model:value="registerForm.email" style="width: 300px;height:40px" placeholder="邮箱"/>
                </a-form-item>
                <div style="display: flex;justify-content: space-between">
                  <a-form-item name="code">
                    <a-input
                        v-model:value="registerForm.code"
                        style="height:40px"
                        placeholder="验证码"
                    />
                  </a-form-item>
                  <el-button
                      type="primary" icon="Iphone"
                      @click.prevent="receiveCode"
                      style="margin-left: 10px;width: 100px;height: 40px"
                      class=" loginBtn ">验证码
                  </el-button>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
          <button class="form-btn loginBtn inputStyle" v-if="carouselIndex !== 3" @click.prevent="next()">下一步
          </button>
          <button class="form-btn loginBtn inputStyle" v-if="carouselIndex === 3"
                  @click.prevent.stop="registerHandleSubmit">完成
          </button>
          <button class="form-btn-register form-btn  inputStyle" style="margin-top: 10px" v-if="carouselIndex !== 0"
                  @click.prevent="pre()">上一步
          </button>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="js">
import {onMounted, ref, reactive, computed} from 'vue'
import {Login} from "@/api/login.js";
import {useRoute, useRouter} from "vue-router";
import {Register, SendEmailCode} from "@/api/register.js";
import {ElMessage} from "element-plus";
import {ClientsLogin} from "@/api/clients_user.js";

const formState = reactive({
  username: '',
  password: '',
});

const formRef = ref();

const onFinish = async () => {
  let resp = await ClientsLogin(formState)
  if(resp.data.code ===200){

    localStorage.setItem("rToken",resp.data.rToken)
    localStorage.setItem("aToken",resp.data.aToken)


    ElMessage.success("登录成功")
     await router.push({
      name:"clients_home"
    })
  }
};
const onFinishFailed = errorInfo => {
  // console.log('Failed:', errorInfo);
};


function validateUsername2(rule, value) {
  const regex = /^\d{6,}$/;
  if (regex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject("请输入六位或者六位以上的数字");
}


const rules2 = ref({
  username: [
    {validator: validateUsername2, trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'}
  ],
})


const registerFormRef = ref(null)
let registerForm = ref({
  "username": "",
  "password": "",
  "phone": "",
  "nickname": "",
  "email": "",
  "code": "",
  "sex": "",
  "birthday": ""
})
let formData = ref({
  username: "",
  password: "",
  redirect_url: "",
  state: "",
  client_id: ""
})
const goToClientRegisterPage = () => {
  router.push({
    name: "clientRegister"
  })
}

function validateUsername(rule, value) {
  const regex = /^\d{6,}$/;
  if (regex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject("请输入六位或者六位以上的数字");

}

function validateChinesePhoneNumber(rule, value) {
  // 正则表达式，用于匹配中国手机号码
  const regex = /^1[3-9]\d{9}$/;
  if (regex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject("请输入正确的手机号码(中国)");

}

function validateEmail(rule, value) {
  // 正则表达式，用于匹配标准的电子邮件地址格式
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (regex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject("请输入正确的邮箱地址");
}

const ruleList = ref({
  "0": ['username', 'password'],
  "1": ['nickname', 'phone'],
  "2": ["sex", "birthday"],
  "3": ['email', 'code'],
})

const rules = computed(() => {
  const stepRules = {
    username: [
      {validator: validateUsername, trigger: 'blur'}
    ],
    password: [
      {required: true, message: '请输入密码', trigger: 'blur'}
    ],
    phone: [
      {validator: validateChinesePhoneNumber, trigger: 'blur'}
    ],
    nickname: [
      {required: true, message: '请输入用户昵称', trigger: 'blur'},
    ],
    email: [
      {validator: validateEmail, trigger: 'blur'}
    ],
    code: [
      {required: true, message: '请输入邮箱验证码', trigger: 'blur'},
    ],
    sex: [
      {required: true, message: '请输入性别', trigger: 'blur'},
    ],
    birthday: [
      {required: true, message: '请输入选择出生日期', trigger: 'blur'},
    ],
  };

  const currentStepRules = {};
  ruleList.value[carouselIndex.value].forEach(field => {
    currentStepRules[field] = stepRules[field];
  });
  return currentStepRules;
});


const carouselRef = ref(null)
const back = () => {
  isRegister.value = false
  carouselRef.value.setActiveItem(0)
  registerForm.value = {
    "username": "",
    "password": "",
    "phone": "",
    "nickname": "",
    "email": "",
    "code": ""
  }
  email.value = ""
}

onMounted(() => {
  const hash = window.location.hash.substring(1);
  const hashParams = new URLSearchParams(hash);
  formData.value.client_id = hashParams.get('client_id') || route.query.client_id;
  formData.value.state = hashParams.get('state') || route.query.state;
  formData.value.redirect_url = hashParams.get('redirect_url') || route.query.redirect_url;
})
let email = ref("")
const receiveCode = async () => {
  registerFormRef.value.validateFields(["email"]).then(async res => {
    let {code} = await SendEmailCode({
      email: registerForm.value.email
    })
    if (code === 200) {
      email.value = registerForm.value.email
      ElMessage.success("发送成功")
    }
  }).catch(err => {
    //
  })
}


const registerHandleSubmit = async () => {
  await registerFormRef.value.validate().then(async res => {
    if (email.value !== registerForm.value.email) {
      alert("修改邮箱请重新获取验证码")
    } else {
      registerForm.value.birthday = new Date(registerForm.value.birthday).getTime()
      let resp = await Register(registerForm.value)
      if (resp.code === 200) {
        ElMessage.success("注册成功")
        back()
      }
    }
  })
}

let carouselIndex = ref(0)
const carouselChange = (index) => {
  carouselIndex.value = index
}

const next = async () => {
  registerFormRef.value.validate().then(() => {
    carouselRef.value.next()
  })
}
const pre = () => {
  carouselRef.value.setActiveItem(carouselIndex.value - 1)
}

const registerBtn = () => {
  isRegister.value = true
}
let isRegister = ref(false)
const route = useRoute()
const router = useRouter()

const handleSubmit = async (event) => {
  if (formData.value.username && formData.value.password) {
    await Login(formData.value)
  } else {
    alert("请输入账号和密码")
  }
}


</script>
<style>
.form-container .ant-select-selector,
.form-container .ant-select-selection-search {
  height: 40px !important;
}

.form-container .ant-select-selection-item {
  display: flex;
  align-items: center;
}

</style>
<style scoped>
.login-box {
  z-index: 2;
}

.boxItem {
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

.box3d {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  transform-style: preserve-3d;
  transform: rotateY(0deg);
  transition: transform 0.6s;
  box-shadow: 1px 1px 10px #ececec;
  border: 1px solid #ececec;
  width: 360px;
  height: 400px;
}

.register-box {
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
  background-image: url(@/assets/clients_img/login_bg.jpg);
  background-size: 100%, 100%;
  border-radius: 10px;
  padding: 20px 30px;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  box-sizing: border-box;
}

.inputStyle {
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

.backIcon {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 30px
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

.form-btn-register {
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
