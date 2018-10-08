<template>
    <div>
        <pingjia></pingjia>
        <div class="sub-discuess">
            
        </div>
    </div>
</template>
<script>
import pingjia from "../comm/pingjia.vue";
export default {
  data() {
    return {};
  },
  components: {
    pingjia
  }
};
</script>
<style>
.sub-discuess {
  width: 50%;
  /* width:3.98rem; */
  height: 0.86rem;
  background: rgba(255, 70, 145, 1);
  border-radius: 6rem;
}
</style>
