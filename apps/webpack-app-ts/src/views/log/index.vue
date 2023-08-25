<template>
  <div>
    <el-table :data="apilist" border style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="project" label="project" />
      <el-table-column prop="content" label="content" />
      <el-table-column prop="version" label="version" />
      <el-table-column prop="createTime" label="createTime" />
    </el-table>
  </div>
  <div id="bloom-mount"></div>
  <link rel="stylesheet" href="../assets/index-be688f7d.css" />
</template>
<script type="module" crossorigin src="../assets/index-3921b0fa.js" ignore></script>
<script setup>
import { defineComponent, reactive, toRefs, onMounted, ref } from 'vue'
import { getLogList } from '@/services/api'

const show = ref(false)
// 编辑
const handleDetail = (index, row, idx) => {
  console.log('index:', index, idx)
  console.log('row:', row)
}
// 删除
const handleDel = (index, row) => {
  console.log(' index:', index)
  console.log(' row:', row)
}
const state = reactive({
  pageModel: {
    page: 1,
    limit: 10,
    total: 0
  },
  list: [], // table数据
  apilist: [],
  columns: [], // 需要展示的列
  operates: {
    width: 200,
    fixed: 'right',
    list: [
      {
        id: '1',
        label: '查看',
        type: 'text',
        show: true,
        disabled: false,
        method: (index, row, ss) => {
          handleDetail(index, row, ss)
        }
      },
      {
        id: '2',
        label: '删除',
        type: 'text',
        show: true,
        disabled: false,
        method: (index, row) => {
          handleDel(index, row)
        }
      }
    ]
  } // 列操作按钮
})

const getLogListApi = () => {
  getLogList({
    page: 1,
    limit: 23
  }).then((result) => {
    console.log(result, 'getLogListApi')
    state.apilist = result.data.docs
  })
}

const getUrlParams = (url) => {
  url = url.split('#')[0]
  const urlParams = {}
  let queryString = url.split('?')[1]
  if (!queryString) {
    if (url.search('=') !== false) {
      queryString = url
    }
  }
  if (queryString) {
    const keyValuePairs = queryString.split('&')
    for (let i = 0; i < keyValuePairs.length; i++) {
      const keyValuePair = keyValuePairs[i].split('=')
      const paramName = keyValuePair[0]
      const paramValue = keyValuePair[1] || ''
      const decodedParam = decodeURIComponent(paramValue.replace(/\+/g, ' '))
      urlParams[paramName] = decodedParam.endsWith('/') ? decodedParam.slice(0, -1) : decodedParam
    }
  }
  return urlParams
}

if (/Trident\/|MSIE /.test(window.navigator.userAgent)) {
  alert('Bloom does not run on Internet Explorer. Supported browsers are Edge, Chrome and Firefox.')
}

window.bloomOptions = getUrlParams(window.location.search)

getLogListApi()
onMounted(async () => {
  // const resultConfig = await getTableConfig('0')
  // const resultData = await getTableData({
  //   GuideLineId: '0',
  //   Param: {
  //     "@tabletype": "VIEW",
  //     "@tablename":"dvsdb30.view_villageepidemic"
  //   }
  // })
  // console.time('data1')
  // Promise.all([resultConfig, resultData]).then((values) => {
  //   console.timeEnd('data1')
  //   console.log(values, 'values', new Date().getMilliseconds());
  //   const result = values[0]
  //   if(result.code == 200 ) {
  //     console.log(result, 'table列表配置')
  //     state.columns = JSON.parse(result.data.resultColumns)
  //     console.log(state.columns, 'state.columns')
  //   }
  //   const data = values[1]
  //   if(data.code == 200 ) {
  //     console.log(data, 'table列表配置')
  //     state.list =data.data
  //     console.log(state.columns, 'state.columns')
  //   }
  //   show.value= true
  // });
  // console.log('table-config')
  // const result = await getTableConfig('0')
})
// 选中行
const handleSelectionChange = (val) => {
  console.log('handleSelectionChange-val:', val)
}

state.list = []
// state.columns = columns_test;
const search = () => {
  state.list = [...state.list]
  console.log(state.pageModel, 'state.pageModel')
}
</script>
<style>
* {
  padding: 0;
  margin: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
}
/* Generated with https://google-webfonts-helper.herokuapp.com/fonts/nunito-sans */
/* nunito-sans-300 - latin */
@font-face {
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 300;
  src: local('Nunito Sans Light'), local('NunitoSans-Light'),
    url('./assets/nunito-sans-v8-latin-300-983e357f.woff2') format('woff2'),
    url('./assets/nunito-sans-v8-latin-300-0a42bcbb.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* nunito-sans-regular - latin */
@font-face {
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 400;
  src: local('Nunito Sans Regular'), local('NunitoSans-Regular'),
    url('./assets/nunito-sans-v8-latin-regular-0b125629.woff2') format('woff2'),
    url('./assets/nunito-sans-v8-latin-regular-75d981da.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* nunito-sans-700 - latin */
@font-face {
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 700;
  src: local('Nunito Sans Bold'), local('NunitoSans-Bold'),
    url('./assets/nunito-sans-v8-latin-700-abf55d85.woff2') format('woff2'),
    url('./assets/nunito-sans-v8-latin-700-edc01160.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* nunito-sans-800 - latin */
@font-face {
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 800;
  src: local('Nunito Sans ExtraBold'), local('NunitoSans-ExtraBold'),
    url('./assets/nunito-sans-v8-latin-800-b913028c.woff2') format('woff2'),
    url('./assets/nunito-sans-v8-latin-800-4100b1f0.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
html {
  font-family: 'Nunito Sans', sans-serif;
}
#bloom-mount {
  position: relative;
  height: 100vh;
  max-height: 100%;
  max-width: 100%;
  width: 100%;
}
</style>
