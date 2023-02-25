<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="bannerfile" label="图片文件" required>
        <uni-file-picker file-mediatype="image" return-type="object" v-model="formData.bannerfile"></uni-file-picker>
      </uni-forms-item>
      <uni-forms-item name="open_url" label="点击目标地址">
        <uni-easyinput placeholder="点击跳转目标地址。如果是web地址则使用内置web-view打开；如果是本地页面则跳转本地页面；如果是schema地址则打开本地的app" v-model="formData.open_url" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="title" label="标题">
        <uni-easyinput placeholder="注意标题文字颜色和背景图靠色导致看不清的问题" v-model="formData.title" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="sort" label="排序">
        <uni-easyinput placeholder="数字越小，排序越前" type="number" v-model="formData.sort"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="category_id" label="分类id">
        <uni-easyinput placeholder="多个栏目的banner都存在一个表里时可用这个字段区分" v-model="formData.category_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="status" label="生效状态">
        <switch @change="binddata('status', $event.detail.value)" :checked="formData.status"></switch>
      </uni-forms-item>
      <uni-forms-item name="description" label="备注">
        <uni-easyinput placeholder="维护者自用描述" v-model="formData.description" trim="both"></uni-easyinput>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/opendb-banner.js';

  const db = uniCloud.database();
  const dbCollectionName = 'opendb-banner';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        result[key] = validator[key]
      }
    }
    return result
  }

  

  export default {
    data() {
      let formData = {
        "bannerfile": null,
        "open_url": "",
        "title": "",
        "sort": null,
        "category_id": "",
        "status": true,
        "description": ""
      }
      return {
        formData,
        formOptions: {},
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onLoad(e) {
      if (e.id) {
        const id = e.id
        this.formDataId = id
        this.getDetail(id)
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '修改成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      },

      /**
       * 获取表单数据
       * @param {Object} id
       */
      getDetail(id) {
        uni.showLoading({
          mask: true
        })
        db.collection(dbCollectionName).doc(id).field("bannerfile,open_url,title,sort,category_id,status,description").get().then((res) => {
          const data = res.result.data[0]
          if (data) {
            this.formData = data
            
          }
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
        })
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
  }

  .uni-button-group {
    margin-top: 50px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
  }

  .uni-button {
    width: 184px;
  }
</style>
