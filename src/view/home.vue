<template>
  <div id="app">
     <!-- 整个页面 -->
    <div class="editor-layout">
      <!-- 工具栏 -->
      <ToolBar></ToolBar>
      <!-- 内容 -->
      <div class="editor-layout__main">
        <!-- 侧边栏 -->
        <div class="side-bar">
          <div class="side-bar-wrap">
            <div class="side-bar-menu-wrap">
              <div  class="side-tab-menu upload" :class="curTab == 0 ? 'active':''" @click="tab(0)">
                  <Icon type="ios-cloud-upload" size="30" />
                  <span class="side-tab-menu__label">舆情上报</span>
             </div>
             <div  class="side-tab-menu background" :class="curTab == 1 ? 'active':''" @click="tab(1)">
                <Icon type="ios-hand" size="30"/>
                <span  class="side-tab-menu__label">舆情管理</span>
              </div>
              <div  class="side-tab-menu background" :class="curTab == 2 ? 'active':''" @click="tab(2)">
                <Icon type="ios-paper-outline" size="30"/>
                <span  class="side-tab-menu__label">标签管理</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 编辑区 -->
        <div class="editor-layout__edit">
          <List v-show="curTab==0"></List>
          <Tag v-show="curTab==2"></Tag>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import List from './public_opinion/list'
import Tag from './public_opinion/tag'
import ToolBar from './toolbar'
export default {
  components: {
    ToolBar,
    List,
    Tag,
  },
  data () {
    return {
      curTab: 0
    }
  },
  mounted () {
  },
  methods: {
    tab (index) {
          this.curTab = index
    },
  }
}
</script>
<style scoped>
@import "../assets/css/home.css";
</style>