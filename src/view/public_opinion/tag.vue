<template>
  <div>
    <Row>
      <Input v-model="params.keywords" search enter-button="搜索" placeholder="输入关键字" style="width: 200px" />
      <Button type="success" @click="refresh">刷新</Button>
      <Button type="default" @click="addModal=true">添加</Button>
    </Row>
    <Table border width="900" :columns="col" :data="data" />
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="total"  :current="index" @on-change="changePage"  :page-size="params.limit"></Page>
        </div>
    </div>
    <Modal v-model="addModal" width="360">
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
  </div>
</template>
<script>
import {find,add,del} from '@/api/tag'
export default {
  name: 'public_tag',
  data () {
    return {
      loading: false,
      total:0,
      index:1,
      addModal: false,
      submitting: false,
      params: {
        tagname: '',
        limit:50,
        skip:0
      },
      data: [],
      col: [
        {
          title: 'ID',
          key: '_id'
        },
        {
          title: '标签',
          key: 'tagname'
        },
        {
          title: '创建人',
          key: 'creator'
        },
        {
          title: '创建日期',
          key: 'createtime'
        },
        {
          title: '操作',
          key: 'Action',
          width: 80,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {

                },
                on: {
                  click: () => {
                    this.del(params)
                  }, 
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.params.skip = this.params.limit * (this.index-1)
      find(this.params).then(res => {
        this.data = res.data.data
        this.total = res.data.count
      })
    },
    refresh () {
      if (this.loading) {
        this.$Message.info('查询中')
        return
      }
      this.loading = true
      setTimeout(()=>this.loading=false,3000)
      this.getData()
    },
    changePage (value) {
      this.index = value
      this.getData()
    },
    del (params) {
      if (confirm("确定删除吗?")) {
        del(params.row._id).then(res => {
        if (res.data.success) {
          this.$Message.info('成功')
          this.data.splice(params.index,1)
        } else {
          alert(res.data.msg)
        }
      })
      }
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
          this.addModal = false
        } else {
          alert(res.data.msg)
        }
      })
    }
  }
}
</script>