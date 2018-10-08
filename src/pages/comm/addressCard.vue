<template>
  <div v-if="data.state == 1" class="address">
    <div class="address_header">
      <span v-if="data.isDefaults == 1" class="address_default">默认</span>
      <span>{{ data.custName }}</span>
      <span class="address_phone">{{ data.tel }}</span>
    </div>
    <p class="address_content">{{ data.provinceName }} {{ data.cityName }} {{ data.areaName }} {{ data.address }}</p>
    <div class="address_footer">
      <span @click="toEdit"><i-icon type="brush" color="#666666" size="18" /> 编辑</span>
      <span @click="toDelete"><i-icon type="trash" color="#666666" size="18" /> 删除</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      
    }
  },
  methods: {
    toEdit () {
      this.$emit('edit', this.data)
    },
    toDelete () {
      this.$http.post('address/delete', {
        id: this.data.id
      }).then(res => {
        if (res.code == 1) {
          this.$emit('deleteSuccess')
        } else {
          wx.showToast({
            title: '删除失败'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.address {
  padding: 25rpx 35rpx;
  margin-bottom: 18rpx;
  background: #fff;
}
.address_header {
  display: flex;
  align-items: center;
  font-size: 30rpx;
  color: #333333;
  margin-bottom: 15rpx;
}
.address_default {
  font-size: 24rpx;
  color: #fff;
  background: #FF4691;
  border-radius: 4rpx;
  padding: 4rpx 6rpx;
  margin-right: 10rpx;
}
.address_phone {
  flex: 1;
  text-align: right;
}
.address_content {
  font-size: 26rpx;
  color: #666666;
  line-height: 40rpx;
  padding-bottom: 17rpx;
  border-bottom: 1rpx solid #f1f1f1;
  margin-bottom: 28rpx;
}
.address_footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 26rpx;
  color: #666666;
}
.address_footer span {
  display: flex;
  align-items: center;
}
.address_footer > span:last-child {
  margin-left: 40rpx;
}
</style>
