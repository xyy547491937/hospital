module.exports = [
  {
    path: 'pages/index',
    name: 'tet',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '胚豆',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-input": "../../dist/input/index",
        "i-icon": "../../dist/icon/index",
        "i-card": "../../dist/card/index",
        "i-sticky": "../../dist/sticky/index",
        "i-sticky-item": "../../dist/sticky-item/index",
        "i-icon": "../../dist/icon/index",
        "i-rate": "../../dist/rate/index",
        "i-cell": "../../dist/cell/index"
      }
    }
  },
  {
    path: 'pages/others/interested',
    name: 'interested',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '感兴趣的'
    }
  },
  {
    path: 'pages/authorization',
    name: 'authorization',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '用户授权',
      "usingComponents": {
        "i-input": "../../dist/input/index",
        "i-button": "../../dist/button/index"
      }
    }
  },
  {
    path: 'pages/citySelect',
    name: 'citySelect',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '选择城市'
    }
  },
  {
    path: 'pages/others/orgin',
    name: 'orgin',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '机构主页',
      "usingComponents": {
        "i-rate": "../../dist/rate/index",
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-input": "../../dist/input/index",
        "i-icon": "../../dist/icon/index",
        "i-card": "../../dist/card/index",
        "i-index": "../../dist/index/index",
        "i-index-item": "../../dist/index-item/index",
        "i-tab-bar": "../../dist/tab-bar/index",
        "i-tab-bar-item": "../../dist/tab-bar-item/index"
      }

    }
  },
  {
    path: 'pages/personal/message',
    name: 'personalMessage',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '我的消息',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-cell-group": "../../dist/cell-group/index",
        "i-cell": "../../dist/cell/index",
        "i-icon": "../../dist/icon/index",
        "i-card": "../../dist/card/index",
        "i-index": "../../dist/index/index",
        "i-index-item": "../../dist/index-item/index"
      }

    }
  },
  // {
  //   path: 'pages/personal/index',
  //   name: 'personal',
  //   config: { // 页面配置，即 page.json 的内容
  //     navigationBarTitleText: '个人信息',

  //   }
  // },
  {
    path: 'pages/shop',
    name: 'shop',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '商城',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-input": "../../dist/input/index",
        "i-icon": "../../dist/icon/index",
        "i-card": "../../dist/card/index",
        "i-index": "../../dist/index/index",
        "i-index-item": "../../dist/index-item/index",
        "i-tabs": "../../dist/tabs/index",
        "i-tab": "../../dist/tab/index"

      }
    }
  },
  {
    path: 'pages/shop/fight_group',
    name: 'fightGroup',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '拼团',
      "usingComponents": {
        "i-tabs": "../../dist/tabs/index",
        "i-tab": "../../dist/tab/index"
      }
    }
  },
  {
    path: 'pages/project_detail',
    name: 'projectDetail',
    config: {
      navigationBarTitleText: '详情',
      "usingComponents": {
        "i-cell-group": "../../dist/cell-group/index",
        "i-cell": "../../dist/cell/index",
        "i-card": "../../dist/card/index",
        "i-button": "../../dist/button/index",
        "i-tabs": "../../dist/tabs/index",
        "i-tab": "../../dist/tab/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pages/shop/address_management',
    name: 'addressManagement',
    config: {
      navigationBarTitleText: '地址管理',
      "usingComponents": {
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pages/shop/shipping_address',
    name: 'shippingAddress',
    config: {
      navigationBarTitleText: '收货地址',
      "usingComponents": {
        "i-input": "../../dist/input/index",
        "i-cell": "../../dist/cell/index",
        "i-drawer": "../../dist/drawer/index"
      }
    }
  },
  {
    path: 'pages/shop/request_refund',
    name: 'requestRefund',
    config: {
      navigationBarTitleText: '申请退款',
      "usingComponents": {
        "i-panel": "../../dist/panel/index",
        "i-radio-group": "../../dist/radio-group/index",
        "i-radio": "../../dist/radio/index"
      }
    }
  },
  {
    path: 'pages/invite_friends',
    name: 'inviteFriends',
    config: {
      navigationBarTitleText: '邀请好友',
      "usingComponents": {
        "i-panel": "../../dist/panel/index",
        "i-radio-group": "../../dist/radio-group/index",
        "i-radio": "../../dist/radio/index",
        "i-steps": "../../dist/steps/index",
        "i-step": "../../dist/step/index"
      }
    }
  },
  {
    path: 'pages/select_commodity',
    name: 'selectCommodity',
    config: {
      navigationBarTitleText: '医美',
      "usingComponents": {
        "i-panel": "../../dist/panel/index",
        "i-radio-group": "../../dist/radio-group/index",
        "i-radio": "../../dist/radio/index",
        "i-steps": "../../dist/steps/index",
        "i-step": "../../dist/step/index",
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pages/doctor_detail',
    name: 'doctorDetail',
    config: {
      navigationBarTitleText: '医生主页',
      "usingComponents": {
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pages/submit_order',
    name: 'submitOrder',
    config: {
      navigationBarTitleText: '购买信息',
      "usingComponents": {
        "i-icon": "../../dist/icon/index",
        "i-cell": "../../dist/cell/index"
      }
    }
  },
  {
    path: 'pages/groupOrderDetail',
    name: 'groupOrderDetail',
    config: {
      navigationBarTitleText: '订单详情',
      "usingComponents": {
        "i-icon": "../../dist/icon/index",
        "i-cell": "../../dist/cell/index"
      }
    }
  },
  {
    path: 'pages/orderDetail',
    name: 'orderDetail',
    config: {
      navigationBarTitleText: '订单详情',
      "usingComponents": {}
    }
  },
  {
    path: 'pages/shop/doctor_example',
    name: 'doctorExample',
    config: {
      navigationBarTitleText: '医生的案例',
      "usingComponents": {
        "i-icon": "../../dist/icon/index",
        "i-cell": "../../dist/cell/index"
      }
    }
  },
  {
    path: 'pages/shop/special_offer',
    name: 'special_offer',
    config: {
      navigationBarTitleText: '医生商品列表',
      "usingComponents": {
        "i-icon": "../../dist/icon/index",
        "i-cell": "../../dist/cell/index"
      }
    }
  },
  {
    path: 'pages/info/information',
    name: 'information',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '详情',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index"
      }
    }
  },
  {
    path: 'pages/info/video_info',
    name: 'videoInfo',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '详情'
    }
  },
  {
    path: 'pages/info/diary_info',
    name: 'diaryInfo',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '日记本详情'
    }
  },
  {
    path: 'pages/info/diary',
    name: 'diary',
    config: { // 日记详情
      navigationBarTitleText: '内容',
      "usingComponents": {
        "i-icon": "../../dist/icon/index"
      }
    }
  },
  {
    path: 'pages/info/news_info',
    name: 'news_info',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index"
      }
    }
  },
  // {
  // 	path: 'pages/comm/beautyDiary',
  // 		name: 'beautyDiary',
  // 		config: {
  // 			navigationBarTitleText: ''
  // 		}
  //   },
  {
    path: 'pages/mine',
    name: 'mine',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '我的',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-input": "../../dist/input/index",
        "i-icon": "../../dist/icon/index",
        "i-card": "../../dist/card/index",
        "i-index": "../../dist/index/index",
        "i-index-item": "../../dist/index-item/index"
      }

    }
  },
  {
    path: 'pages/mineItem/myAppointment',
    name: 'myAppointment',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '我的预约',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-input": "../../dist/input/index",
        "i-icon": "../../dist/icon/index",
        "i-card": "../../dist/card/index",
        "i-index": "../../dist/index/index",
        "i-index-item": "../../dist/index-item/index"
      }

    }
  },
  {
    path: 'pages/mineItem/myFollow',
    name: 'myFollow',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '我的关注',

    }
  },
  {
    path: 'pages/mineItem/signatureList',
    name: 'myAppointment',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '我的手签',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index"

      }

    }
  },
  {
    path: 'pages/others/productDetails',
    name: 'myAppointment',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '详情',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index"
        //
      }

    }
  },
  {
    path: 'pages/myOrder',
    name: 'myOrder',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '订单列表',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index"
        //
      }
    }
  },
  {
    path: 'pages/mineItem/orderDetails',
    name: 'orderDetails',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '订单详情',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index"
        //
      }

    }
  },
  {
    path: 'pages/mineItem/collect',
    name: 'collect',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '收藏',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index"

      }

    }
  },
  {
    path: 'pages/others/successOrder',
    name: 'payOrder',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '确认订单',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index",
        // "i-cell-group": "../../dist/cell-group/index",
        "i-cell": "../../dist/cell/index",
      }

    }
  },
  {
    path: 'pages/payOrder',
    name: 'payOrder',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '支付订单',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index"

      }

    }
  },
  {
    path: 'pages/mineItem/addressList',
    name: 'addressList',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '地址管理',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index"

      }

    }
  },
  {
    path: 'pages/mineItem/addressDetails',
    name: 'addressList',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '地址详情',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index"

      }

    }
  },
  {
    path: 'pages/mineItem/myAttention',
    name: 'myAttention',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '我的关注',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index"

      }

    }
  },
  {
    path: 'pages/mineItem/myStore',
    name: 'myStore',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '去过的店',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-icon": "../../dist/icon/index"

      }

    }
  },
  {
    path: 'pages/others/signConfirm',
    name: 'signConfirm',
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '手签确认',
      "usingComponents": {
        "i-row": "../../dist/row/index",
        "i-col": "../../dist/col/index",
        "i-button": "../../dist/button/index",
        "i-avatar": "../../dist/avatar/index"
      }
    }
  }, {
    path: "pages/shop/cart",
    name: 'cart',
    config: {
      navigationBarTitleText: '购物车',
      usingComponents: {
        // "i-input-number": "../../dist/input-number/index"
      }
    }
  }, {
    path: "pages/shop/myAppointment",
    name: "myAppointment",
    config: {
      navigationBarTitleText: "在线预约",
      usingComponents: {

      }

    }
  },
  {
    path: "pages/personal/index",
    name: "personInfo",
    config: {
      navigationBarTitleText: "用户信息",
      usingComponents: {
        "i-icon": "../../dist/icon/index"
      }

    }
  }, {
    path: "pages/shop/orderDetail",
    name: "shopOrderDetail",
    config: {
      navigationBarTitleText: "订单详情",
      usingComponents: {}
    }
  }, {
    path: "pages/mineItem/myDiscuess",
    name: "myDiscuess",
    config: {
      navigationBarTitleText: "我的评价",
      usingComponents: {}
    }
  }, {
    path: "pages/mineItem/serverDiscuess",
    name: "serverDiscuess",
    config: {
      navigationBarTitleText: "服务评价",
      usingComponents: {
        "i-rate": "../../dist/rate/index"
      }
    }

  },
  {
    path: "pages/mineItem/storeDetail",
    name: "storeDetail",
    config: {
      navigationBarTitleText: "门店信息",
      usingComponents: {
        "i-icon": "../../dist/icon/index"
      }

    }
  }
  //   {
  //     path: "pages/mineItem/myStore",
  //     name: "myStore",
  //     config: {
  //       navigationBarTitleText: "医生查询"

  //     }
  //   },
  //   {
  //     path: "pages/personal/index",
  //     name: "personInfo",
  //     config: {
  //       navigationBarTitleText: "用户信息",
  //       usingComponents: {
  // 		"i-icon": "../../dist/icon/index"
  //       }

  //     }
  //   },
]
