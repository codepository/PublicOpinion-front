<template>
    <Row>
      <Select v-model="vals" @on-change="change" @on-select="select" multiple placeholder="选择标签" style="width:180px">
        <Option v-for="item in data" :value="item.tagname" :key="item._id">{{item.tagname}}</Option>
        <Icon type="ios-add-circle" size="25" @click="modal1=true"/>
      </Select>
      <Modal v-model="modal1" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>添加标签</span>
        </p>
        <div style="text-align:center">
            <Input v-model="tagname" required placeholder="输入标签名称"></Input>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="submitting" @click="add">确认</Button>
        </div>
      </Modal>
    </Row>
</template>
<script>
import { find,add } from '@/api/tag'
export default {
  name: 'select_tag_multiple',
  props: {
    value: { type: Array}
  },
  data () {
    return {
      data: [],
      modal1: false,
      vals: [],
      tagname: '',
      submitting: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      find().then(res => {
        if (res.data.code ===1){
          alert(res.data.msg)
          return
        }
        this.data = res.data.data
      })
    },
    change (data) {
      this.vals = data
      this.$emit('update:value',data)
    },


    add () {
      if (this.submitting) {
        this.$Message.info('添加中')
        return
      }
      this.submitting = true
      setTimeout(()=> this.submitting =false,3000)
      let tag = {
        tagname: this.tagname,
        creator: this.$store.state.user.userName,
        uid: this.$store.state.user.uid
      }
      add(tag).then(res=>{
        if (res.data.success) {
          tag._id = res.data.msg._id
          this.data.unshift(tag)
          this.modal1 = false
        } else {
          alert(res.data.msg)
        }
      })
    }
  }
}
</script>