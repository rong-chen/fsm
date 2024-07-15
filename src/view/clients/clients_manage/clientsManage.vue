<template>
  <div>
    <a-table :columns="columns" :data-source="tableData" :pagination="paginationOption" @change="changePagination">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'client_name'">
          <span>
            <smile-outlined />
            {{column.name}}
          </span>
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'btnGroup'">
<!--          {{ column}}-->
          <a-popconfirm
              title="你确定要删除该数据吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="confirmDelete(record)"
          >
            <a-button  shape="circle"  >
              <DeleteOutlined />
            </a-button>
          </a-popconfirm>
      </template>
      </template>
    </a-table>
  </div>
</template>
<script setup>
import {ref,onMounted} from "vue";
import {deleteRow, getTableData} from "@/api/clients_manage.js"
import {userInfoStore} from "@/pinia/user.js";
import {
  SmileOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue';
import {ElMessage} from "element-plus";
const userInfo =userInfoStore()

// 点击删除按钮
const confirmDelete =async ({Id})=>{
 let resp =await deleteRow(Id)
  console.log(resp)
  if(resp['code'] ===200){
    ElMessage.success("删除成功")
    await searchTable({
      page: paginationOption.value.current,
      pageSize: paginationOption.value.pageSize,
    })
  }

}

let paginationOption =ref({
  total:0,
  current:1,
  pageSize:10
})


const changePagination =(value)=>{
  searchTable({
    page:value.current,
    pageSize:value.pageSize,
  })
  paginationOption.value.current = value.current
  paginationOption.value.pageSize = value.pageSize
}

const searchTable=async(obj)=>{
  let resp =await getTableData({
        ...obj
      }
  )
  if(resp['code'] === 200){
    tableData.value =resp.data.data
    paginationOption.value.total =Number(resp.data.total)
  }
}

onMounted(()=>{
    searchTable({
     page:1,
     pageSize:10
   })
})
const columns = [
  {
    name: '项目名称',
    dataIndex: 'client_name',
    key: 'client_name',
  },
  {
    title: '重定向URI',
    dataIndex: 'redirect_uri',
    key: 'redirect_uri',
  },
  {
    title: '类型',
    dataIndex: 'grant_type',
    key: 'grant_type',
  },{
    title: '客户端URL',
    dataIndex: 'client_url',
    key: 'client_url',
  },{
    title: 'logo',
    dataIndex: 'logo_uri',
    key: 'logo_uri',
  },{
    title: '权限',
    dataIndex: 'scope',
    key: 'scope',
  },
  {
    title: '',
    key: 'btnGroup',
  },
];
let tableData = ref([])
</script>

<style scoped>

</style>
