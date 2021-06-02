<template>
    <div style="margin:20%;width:300px;height:100px;">
      <Card>
        <p>找回密码</p>
        <i-input v-model="account" placeholder="输入邮箱"></i-input>
        <Button @click="handleSubmit" type="primary">确定</Button>
      </Card>
    </div>
</template>
<script>
import {findPass} from '@/api/user'
export default {
  name: 'findPass',
  data () {
    return {
      account: '',
      modal: true
    }
  },
  methods: {
    cancel () {
      this.$Message.info('点击了取消')
    },
    handleSubmit () {
      if (this.account === '') {
        this.$Message.error('账号不能为空')
        return
      }
      findPass(this.account).then((res) => {
        if (res.data.status === 200) {
          this.$Message.info(res.data.message.header.msg)
          this.$router.push({
            name: 'login'
          })
        } else {
          this.$Message.error(res.data.message)
        }
      })
    }
  }
}
</script>
