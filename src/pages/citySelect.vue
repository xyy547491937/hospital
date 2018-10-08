<template>
  <div class="container ub-box ub-col">
   <city @cityService="cityService"></city>
  </div>
</template>
<script>
  import city from '../components/city.vue'
  export default {
    components: {city},
    data () {
      return {}
    },
    methods: {
      cityService(city) {
        // 更新Vuex state中的curCity
        this.$store.commit('updateCity', city.name)
        this.$store.commit('updateCityId', city.zip)
        console.log(this.$store)
        wx.navigateBack({delta: 1})
      }
    }
  }
</script>
<style scoped>
  .container{width:100%;height:100vh;background:#fff}
</style>
