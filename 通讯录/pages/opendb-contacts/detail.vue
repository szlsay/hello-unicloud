<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options" :collection="collectionList" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
        <view>
          <text>姓名</text>
          <text>{{data.username}}</text>
        </view>
        <view>
          <text>性别</text>
          <uni-data-picker :localdata="options.gender_valuetotext" :value="data.gender" :multiple="false" :readonly="true" :arrow="false" split=","></uni-data-picker>
        </view>
        <view>
          <text>电话</text>
          <text>{{data.mobile}}</text>
        </view>
        <view>
          <text>邮箱</text>
          <uni-link :href="'mailto:'+data.email" :text="data.email"></uni-link>
        </view>
        <view>
          <text>备注</text>
          <text>{{data.comment}}</text>
        </view>
        <view>
          <text>民族</text>
          <text>{{data.nation && data.nation[0] && data.nation[0].text}}</text>
        </view>
        <view>
          <text>地址</text>
          <text>{{data.addressCity && data.addressCity[0] && data.addressCity[0].text}}</text>
        </view>
      </view>
    </unicloud-db>
    <view class="btns">
      <button type="primary" @click="handleUpdate">修改</button>
      <button type="warn" class="btn-delete" @click="handleDelete">删除</button>
    </view>
  </view>
</template>

<script>
  // 由schema2code生成，包含校验规则和enum静态数据
  import { enumConverter } from '../../js_sdk/validator/opendb-contacts.js'
  const db = uniCloud.database()

  export default {
    data() {
      return {
        queryWhere: '',
        collectionList: [ db.collection('opendb-contacts').field('username,gender,mobile,email,comment,nation,addressCity').getTemp(),db.collection('opendb-nation-china').field('_id, name as text').getTemp() ],
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        },
        options: {
          // 将scheme enum 属性静态数据中的value转成text
          ...enumConverter
        }
      }
    },
    onLoad(e) {
      this._id = e.id
    },
    onReady() {
      if (this._id) {
        this.collectionList = [ db.collection('opendb-contacts').where('_id=="' + this._id + '"').field('username,gender,mobile,email,comment,nation,addressCity').getTemp(),db.collection('opendb-nation-china').field('_id, name as text').getTemp() ]
      }
    },
    methods: {
      handleUpdate() {
        // 打开修改页面
        uni.navigateTo({
          url: './edit?id=' + this._id,
          events: {
            // 监听修改页面成功修改数据后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      },
      handleDelete() {
        this.$refs.udb.remove(this._id, {
          success: (res) => {
            // 删除数据成功后跳转到list页面
            uni.navigateTo({
              url: './list'
            })
          }
        })
      }
    }
  }
</script>

<style>
  .container {
    padding: 10px;
  }

  .btns {
    margin-top: 10px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
  }

  .btns button {
    flex: 1;
  }

  .btn-delete {
    margin-left: 10px;
  }
</style>
