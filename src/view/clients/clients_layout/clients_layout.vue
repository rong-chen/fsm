<template>
  <div  class="layout-container">
    <a-layout style="height: 100%">
      <a-layout-header class="header" style="background-color: white;display: flex;align-items: center">
        <div class="logo" />
        <div class="header-title">
          胖狐开发者平台
        </div>
      </a-layout-header>
      <a-layout style="height: 100%">
        <a-layout-sider width="200">
          <a-menu
              theme="dark"
              v-model:openKeys="openKeys"
              v-model:selectedKeys="selectedKeys"
              mode="inline"
              :items="items"
              @click="clickMenuLink"
          >
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px;" >
          <a-layout-content
              :style="{backgroundColor: 'white',  padding: '15px', margin: '24px 0', minHeight: '500px' }"
          >
            <router-view></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup>
import {h, onMounted, ref, watch} from 'vue';
import {MailOutlined} from '@ant-design/icons-vue';
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()
const selectedKeys = ref(['1']);
const openKeys = ref(['/clients_layout']);

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = ref([]);
const clickMenuLink = e => {
  router.push({
    name:e.key
  })
};

onMounted(() => {
  settingMenu()
  selectedKeys.value = [route.name]
  openKeys.value = [route.matched[0].name]
})
const settingMenu=()=>{
  router.options && router.options.routes.forEach(pItem => {
    if (!pItem.disabledShow) {
      let obj = getItem(pItem.label, pItem.name, () => h(MailOutlined), [])
      if (pItem.children.length) {
        pItem.children.forEach(sItem => {
          obj.children.push(getItem(sItem.label, sItem.name),)
        })
      }
      items.value.push(obj)
    }
  })
}

</script>

<style scoped>
.logo{
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-image: url("@/assets/clients_img/system-icon.png");
  background-size: 100%,100%;
  margin-right: 10px;
}
  .header-title{
    font-weight: bold;
    font-size: 20px;
 }
.layout-container{
  height: 100% !important;
}
</style>

