<template>
  <!---登录和主页等没有layout--->
  <router-view v-if="!showLayout" />
  <layout v-show="showLayout" />
</template>
<script lang="ts">
import { defineComponent, watch, defineAsyncComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    Layout: defineAsyncComponent(() => import('./layout/index.vue'))
  },
  setup() {
    const route = useRoute()
    const showLayout = ref(false)
    // 监测路由判断是主应用路由还是子应用路由
    watch(
      () => route.path,
      () => {
        if (['/home', '/login', '/', '/init-password'].includes(route.path)) {
          showLayout.value = false
        } else {
          showLayout.value = true
        }
      },
      {
        immediate: true
      }
    )
    return {
      showLayout
    }
  }
})

function getUrlParams(url: any) {
  url = url.split('#')[0] as any
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

;(window as any).bloomOptions = getUrlParams(window.location.search)

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
  z-index: 9999;
}
.scroll1 {
  height: 200px;
  width: 500px;
  margin: 100px auto;
  border: 1px solid red;
  overflow: hidden;
}

.scroll2 {
  height: 160px;
  width: 500px;
  margin: 100px auto;
  border: 1px solid blue;
  overflow: hidden;
}

.scroll1 .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
}

.scroll2 .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
}
</style>
