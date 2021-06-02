<template>
  <div>
    <Row>
      <DatePicker type="daterange"  placement="bottom-end" placeholder="日期选择" style="width: 200px"></DatePicker>
      <SelectTag :value.sync="params.tag"/>
      <Input v-model="params.keywords" search enter-button="搜索" placeholder="输入关键字" style="width: 200px" />
      <Button type="success" @click="refresh">刷新</Button>
      <Button type="info" @click="upModal = true">上传</Button>
    </Row>
    <Table border width="900" :columns="col" :data="data"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="total"  :current="index" @on-change="changePage"  :page-size="params.limit"></Page>
        </div>
    </div>
    <Modal v-model="upModal" fullscreen title="舆情上报">
      <Upload @add="add"></Upload>
    </Modal>
  </div>
</template>
<script>
import { find,add, del } from '@/api/opinion.js'
import SelectTag from '_c/select_tag_multiple.vue'
import Upload from './upload.vue'
export default {
  name:'opinion_list',
  components: {
    Upload,
    SelectTag
  },
  data () {
    return {
      upModal: false,
      refreshing: false,
      total: 0,
      index: 1,
      params: {
        title: '',
        startDate: '',
        endDate: '',
        tag:'',
        keywords: '',
        limit: 5,
        skip: 0
      },
      col: [
        {
          title: 'ID',
          key: '_id'
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '总报道篇数',
          key: 'num'
        },
        {
          title: '操作',
          key: 'Action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                        click: () => {
                           console.log(params)
                        }
                    }
                }, '编辑'),
                h('Button', {
                    props: {
                        type: 'error',
                        size: 'small'
                    },
                    on: {
                        click: () => {

                            del(params.row._id).then(res => {
                              if (res.data.success) {
                                this.$Message.info('成功')
                                this.data.splice(params.index, 1)
                              } else {
                                alert(res.data.msg)
                              }
                            })
                        }
                    }
                }, '删除')
            ]);
          }
        }
      ],
      data: []
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
      if (this.refreshing) {
        this.$Message.info('查询中')
        return
      }
      this.refreshing = true
      setTimeout(()=>this.refreshing=false,3000)
      this.getData()
    },
    changePage (value) {
      this.index = value
      this.getData()
    },
    add (params) {
      console.log(params)
      add(params).then(res => {
        const data = res.data
        if (data.success) {
          params._id = data.msg._id
          this.data.unshift(params)
          this.upModal = false
        } else {
          alert(data.msg)
        }
      })
    }
  }
}
</script>