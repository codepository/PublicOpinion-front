<template>
  <div class="editor-toolbar">
    <div class="header__logo">
            <a  href="/svgeditor/" target="_blank" class="header__link">
                  <img  src="../assets/images/logo.png" alt="舆情" class="logo">
            </a>
      </div>
      <!-- 用户 -->
      <div class="header-user">
            <div  class="user-info " style="">
                  <img :src="userAvator" class="user-info__head">
                  <div class="user-info__nickname">
                        <span> {{userName}} </span>
                  </div>
            </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'home_toolbar',
  computed: {
            userAvator () {
                  return this.$store.state.user.avatar
            },
            userName () {
                  return this.$store.state.user.userName
            }
      },
}
</script>