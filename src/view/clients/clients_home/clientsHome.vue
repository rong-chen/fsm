<template>
  <div class="home-container">

    <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 5 }"
        autocomplete="off"
        @finish="onFinish"
        style="width: 500px"
        ref="formRef"
        :rules="rules"
    >
      <a-form-item
          label="客户端名称"
          name="client_name"
          :rules="[{ required: true, message: '请输入客户端名称' }]"
      >
        <a-input
            placeholder="示例：胖狐"
            v-model:value="formState.client_name" />
      </a-form-item>
      <a-form-item
          label="权限"
          name="scope"
          :rules="[{ required: true, message: '请输入客户端名称' }]"
      >
        <a-select
            ref="select"
            v-model:value="formState.scope"
            placeholder="示例：基本信息"
        >
          <a-select-option value="1">基本信息</a-select-option>
        </a-select>

      </a-form-item>
      <a-form-item
          label="重定向URL"
          name="client_url"
      >
        <a-input  placeholder="示例：http://127.0.0.1" v-model:value="formState.client_url" />
      </a-form-item>
      <a-form-item
          label="重定向URI"
          name="redirect_uri"
          :rules="[{ required: true, message: '请输入重定向URI' }]"
      >
        <a-input
            placeholder="示例：/callback"
            v-model:value="formState.redirect_uri" />
      </a-form-item>
      <a-form-item
          label="权限类型"
          name="grant_type"
          :rules="[{ required: true, message: '请选择权限类型' }]"
      >
        <a-select
            ref="select"
            v-model:value="formState.grant_type"
            placeholder="示例：code"
        >
          <a-select-option value="code">code</a-select-option>
        </a-select>

      </a-form-item>
      <a-form-item
          label="客户端logo"
          name="logo_uri"
          :rules="[{ required: true, message: '请输入客户端logo' }]"
      >
        <a-input placeholder="127.0.0.1/icon.png" v-model:value="formState.logo_uri" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 5 }">
        <div style="display: flex;align-items: center;justify-content: right">
          <a-button style="margin-right: 20px" @click="clearParams">清空</a-button>
          <a-button type="primary" html-type="submit">提交</a-button>
        </div>
      </a-form-item>
    </a-form>

  </div>
</template>
<script setup >
import {reactive, ref} from 'vue';
import {clients_create} from "@/api/clients_home.js";
import {ElMessage} from "element-plus";
import { h } from 'vue';
import { Modal } from 'ant-design-vue';

const formState = reactive({});
const formRef =ref(null)
const secretDialog =ref(false)
const secretVal =ref("")

// 密钥弹窗
const handleOk =()=>{
  secretDialog.value =false
}

// 校验
function isValidURLorIPv4WithPort(_rule, value) {
  // 正则表达式匹配HTTP/HTTPS URL或纯IPv4地址（可带端口）
  const pattern = /^(https?:\/\/)?((?:[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,})|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))(?::\d{1,5})?$/;
  // 使用正则表达式测试输入的字符串
  if( pattern.test(value) ){
    return Promise.resolve()
  }else{
    return Promise.reject('请正确输入URL')
  }
}
const dialogOpen = (content,title) => {
  Modal.warning({
    title: title,
    content: h('div', {}, [
      h('p', content),
    ])
  });
}
// 提交
const onFinish = values => {
  formRef.value
      .validate()
      .then(async () => {
      let resp =  await clients_create({...values})
        if(resp.code === 200){
          dialogOpen(resp.data,"提示：密钥不可逆，请保存好")
          ElMessage.success("新增成功")
          // 清空表单
          clearParams()
        }
      })
      .catch(error => {
        console.log('error',error);
      });
};
// 清空表单
const clearParams=()=>{
  formRef.value.resetFields()
}

const rules =reactive({
  client_url: [
    {  required: true,validator: isValidURLorIPv4WithPort, trigger: 'change' }
  ],
})
</script>

<style scoped>
  .home-container{
    padding: 30px;
    box-sizing: border-box;
  }
</style>
