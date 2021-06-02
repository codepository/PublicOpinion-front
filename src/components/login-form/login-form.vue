<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="姓名/电话/邮箱">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
      <Button @click="findPass" type="default" long>找回密码</Button>
      <Button  type="default" long>新用户密码为123,账号可使用手机号或者姓名</Button>
    </FormItem>
  </Form>
</template>
<script>
import {findPass} from '@/api/user'
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: 'admin',
        password: '',
        email: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    },
    findPass () {
      this.$Modal.confirm({
        okText: '发送',
        onOk: () => {
          if (this.email === '') {
            this.$Message.error('账号不能为空')
            return
          }
          findPass(this.email).then((res) => {
            if (res.data.status === 200) {
              // this.$Message.info(res.data.message.header.msg)
              alert(res.data.message.header.msg)
              this.$router.push({
                name: 'login'
              })
            } else {
              this.$Message.error(res.data.message)
            }
          })
        },
        render: (h) => {
          return h('Input', {
            props: {
              value: this.email,
              autofocus: true,
              placeholder: '输入邮箱'
            },

            on: {
              input: (val) => {
                this.email = val
              }
            }

          })
        }
      })
      // this.$router.push({
      //   name: 'findPass'
      // })
    }
  }
}
</script>
