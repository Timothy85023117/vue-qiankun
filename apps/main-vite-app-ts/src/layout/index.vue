<template>
  <el-container style="height: 100vh">
    <el-header class="app-header" v-if="showHeader">
      <Header />
    </el-header>
    <el-container style="overflow: auto">
      <el-aside style="box-shadow: 0 2px 10px #f1f1f1; width: 250px" v-if="showLeft">
        <side-menu />
      </el-aside>
      <el-main class="layoutbox">
        <div class="main-wrapper" style="position: relative; height: 100%">
          <!-- <router-view v-show="main"></router-view> -->
          <div id="mainwrapper">1111111111111</div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { defineComponent, watch, reactive, toRefs, defineAsyncComponent, onMounted } from 'vue'
import { registerMicroApps, start } from 'qiankun'
import { useRoute } from 'vue-router'
import { useSystemMenu } from '@/store'

export const getActiveRule = (hash: any) => (location: any) => location.hash.startsWith(hash)

export default defineComponent({
  name: 'Layout',
  components: {
    Header: defineAsyncComponent(() => import('./header.vue')),
    SideMenu: defineAsyncComponent(() => import('./side-menu.vue'))
  },
  setup() {
    const store = useSystemMenu()
    const route = useRoute()
    const state = reactive({
      showHeader: true, // 是否显示顶部状态栏
      showLeft: false, // 暂时为true则不显示左侧菜单
      main: false // 是否为主应用的菜单
    })

    onMounted(() => {
      const array: any = store.systemList
        .filter((item: any) => item.enabled === true)
        .map((item: any) => {
          return {
            name: item.name,
            entry:
              process.env.NODE_ENV === 'production' ? item.productionEntry : item.developmentEntry,
            container: '#mainwrapper',
            activeRule: getActiveRule(`#/${item.name}`)
          }
        })
      console.log('start loading')
      // TODO  在主应用中注册微应用
      registerMicroApps([...array])

      // TODO 启动微应用
      start({
        prefetch: 'all',
        sandbox: {
          // strictStyleIsolation: true,
          experimentalStyleIsolation: true
        }
      })
    })

    // 监测路由判断是主应用路由还是子应用路由
    watch(
      () => route.path,
      () => {
        state.showLeft = route.query.pageType !== '1' // 等于1 传递此参数代表不需要显示左侧菜单
        state.main = route.meta.main
      },
      {
        immediate: true
      }
    )
    // 监测左侧菜单是否展示
    watch(
      () => store.systemId,
      (newValue) => {
        if (newValue) {
          const menu = store.menuList.find((item: any) => item.path === newValue)
          if (menu && menu.source) {
            state.showLeft = menu.source.showLeft
          }
        }
      },
      {
        immediate: true
      }
    )
    return {
      ...toRefs(state)
    }
  }
})
</script>
<style lang="scss" scoped>
.app-header {
  // background: $theme-color;
  background: #093a9b;
}
.layoutbox {
  &::-webkit-scrollbar {
    height: 12px;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.appContainer {
  background: #ccc;
  padding: 20px;
}
</style>
