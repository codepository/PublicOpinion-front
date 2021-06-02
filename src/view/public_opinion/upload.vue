<template>
  <div>
    <Form ref="formval" :model="form" :rules="rules">
      <FormItem label="标题" prop="title">
        <Input v-model="form.title" placeholder="输入标题" ></Input>
      </FormItem>
      <FormItem label="时间" prop="date">
        <Input v-model="form.date" placeholder="输入时间" ></Input>
      </FormItem>
      <FormItem label="标签" prop="tag">
        <SelectTag :value.sync="form.tag"/>
      </FormItem>
      <FormItem label="总篇数" prop="num">
        <Input v-model="form.num" placeholder="输入总篇数" ></Input>
      </FormItem>
      <FormItem label="关键字" prop="keywords">
        <Input v-model="form.keywords" placeholder="输入关键字，逗号隔开" ></Input>
      </FormItem>
      <FormItem label="内容" prop="content">
        <Input v-model="form.content" type="textarea" placeholder="上报内容" />
      </FormItem>
      <FormItem>
            <Button type="primary" @click="submit('formval')" :loading="submitting" >提交</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import {curTimeStamp} from '@/libs/date'
import SelectTag from '_c/select_tag_multiple.vue'
export default {
  name:'public_upload',
  components:{
    SelectTag
  },
  data () {
    return {
      submitting: false,
      form: {
        author: this.$store.state.user.userName,
        uid: this.$store.state.user.uid,
        createtime: '',
        date: '',
        title: '',
        tag: '',
        num: 0,
        keywords:'',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '标题不能为空' }
        ],
        date: [
          { required: true, message: '日期不能为空' }
        ],
        tag: [
          { required: true, message: '标签不能为空' }
        ],
        num: [
          { required: true, message: '报道总篇数不能为空' }
        ],
        keywords: [
          { required: true, message: '关键字不能为空' }
        ],
        content: [
          { required: true, message: '内容不能为空' }
        ]
      }
    }
  },
  mounted () {
    this.form.date = curTimeStamp()
  },
  methods: {
    submit (name) {
      if (this.submitting) {
        this.$Message.info('提交中')
        return
      }
      this.submitting = true
      setTimeout(()=> this.submitting = false, 5000)
      this.$refs[name].validate((valid)=>{
        if (valid) {
          this.$emit('add', this.form)
        }
      })
    }
  }
}
</script>