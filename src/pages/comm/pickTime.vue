<template>
    <div class="show-box" v-if="isShow">
         <view class="show-box-c" >
            <div class="set">
                <span class="cancle" @click="cancleBtn"> 取消</span>
                <span class="confirm" @click="confirmBtn"> 确定</span>
            </div>
          <!-- <view>{{year}}年{{month}}月{{day}}日</view> -->
          <picker-view indicator-style="height: 50px;" style="width: 100%; height: 300px;" :value="value" @change="bindChange($event)">
            <picker-view-column>
              <view v-for="item in years" style="line-height: 50px" :key="item">{{item}}年</view>
            </picker-view-column>
            <picker-view-column>
              <view v-for="item in months" style="line-height: 50px" :key="item">{{item}}月</view>
            </picker-view-column>
            <picker-view-column>
              <view v-for="item in days" style="line-height: 50px" :key="item">{{item}}日</view>
            </picker-view-column>
            <picker-view-column>
              <view v-for="item in hours" style="line-height: 50px" :key="item">{{item}}时</view>
            </picker-view-column>
             <picker-view-column>
              <view v-for="item in minutes" style="line-height: 50px" :key="item">{{item}}分</view>
            </picker-view-column>
          </picker-view>
        </view>
    </div>
</template>
<script>
export default {
  props: ["isShow"],
  data() {
    return {
      years: [],
      year: "1",
      months: [],
      month: 2,
      days: [],
      day: 2,
      // value: [9999, 1, 1],
      hours: [],
      hour: 0,
      minutes: [],
      minute: []
      //   isShow: true
    };
  },
  mounted() {
    this.showTime();
    console.log(this.isShow);
  },
  methods: {
    showTime() {
      const date = new Date();
      const years = [];
      const months = [];
      const days = [];
      const hours = [];
      const minutes = [];
      const timer = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
      for (
        let i = date.getFullYear();
        i <= new Date(timer).getFullYear();
        i++
      ) {
        years.push(i);
      }
      console.log(date.getMonth());
      for (let i = date.getMonth() + 1; i <= 12; i++) {
        months.push(i);
      }

      for (let i = 1; i <= 31; i++) {
        if (i < 10) i = "0" + i;
        days.push(i);
      }
      for (let i = 1; i <= 24; i++) {
        if (i < 10) i = "0" + i;
        hours.push(i);
      }
      for (let i = 0; i <= 59; i++) {
        if (i < 10) i = "0" + i;
        minutes.push(i);
      }
      this.years = years;
      this.months = months;
      this.days = days;
      this.hours = hours;
      this.minutes = minutes;
    },
    confirmBtn() {
      this.isShow = false;
      this.$emit("changeShow", this.isShow);
    },
    cancleBtn() {
      this.isShow = false;
      this.$emit("changeShow", this.isShow);
    },
    bindChange({ mp }) {
      console.log(mp.detail.value);
      let v = mp.detail.value;
      this.month = this.months[v[1]];
      this.day = this.days[v[2]];
      this.hour = this.hours[v[3]];
      this.minute = this.minutes[v[4]];

      let time = `${this.years[0]}-${this.month}-${this.day}   ${this.hour}:${
        this.minute
      }:00`;
      this.$emit("selTime", time);
    }
  }
};
</script>
<style>
.show-box {
  z-index: 10;

  border-top: 1rpx solid #eee;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.show-box-c {
  padding: 10px 15px;
}
.show-box .set {
  font-size: 14px;
  color: #72ace3;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>

