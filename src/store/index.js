import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    curCity: '',
    curCityId: '',
    isLogin: false,
    invited: false, // 是否被邀请
    userInfo: {
      avatarUrl: '',
      city: '',
      gender: '',
      nickName: '',
      mobile: '18210854820',
      province: '',
      peopleId: '',
      openid: '',
      custId: '2',
      session_key: '',
      token: '',
      latitude: '',
      longitude: ''
    },
    httpUrl: 'http://192.168.1.230:8200'
  },
  mutations: {
    updateCity: (state, change) => {
      state.curCity = change
    },
    updateCityId: (state, change) => {
      state.curCityId = change
    },
    updateIsLogin: (state, change) => {
      state.isLogin = change
    },
    cleanUserInfo: (state, change) => {
      console.log(change)
      // change.gender = change.gender === 1 ? '男' : '女'
      state.userInfo = change
    },
    updateUser: (state, change) => {
      console.log(state)
      // change.gender = change.gender === 1 ? '男' : '女'
      state.userInfo = change
      // state.userInfo.avatarUrl = change.avatarUrl ? change.avatarUrl : ''
      // state.userInfo.city = change.city ? change.city : ''
      // state.userInfo.gender = change.gender ? change.gender : ''
      // state.userInfo.nickName = change.nickName ? change.nickName : ''
      // state.userInfo.mobile = change.mobile ? change.mobile : ''
      // state.userInfo.province = change.province ? change.province : ''
      // state.userInfo.peopleId = change.peopleId ? change.peopleId : ''
      // state.userInfo.openid = change.openid ? change.openid : ''
      // state.userInfo.custId = change.custId ? change.custId : ''
      // state.userInfo.session_key = change.session_key ? change.session_key : ''
      // state.userInfo.latitude = change.latitude ? change.latitude : ''
      // state.userInfo.longitude = change.longitude ? change.longitude : ''
    },
    setInvited: (state, params) => {
      state.invited = params.invited
    }
  }
})
export default store
