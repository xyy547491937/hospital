<template>
<div class="tab-box">
    <div class="ls_tab" :style="{width:width}">
    	<div key="0" @click="changeIndex(0,'')">
            <span class="border" :class="{active:0 == isIndex}">推荐</span>
        </div>
        <div v-for="(item, index) in data" :key="index+1" @click="changeIndex(index+1,item.detailCode)">
            <span class="border" :class="{active:index+1 == isIndex}">{{item.label}}</span>
        </div>
    </div>
   <!-- <div class="all">
        <slot name="right">
            <span >
                全部
            </span>
        </slot>
        
    </div>-->
</div>
</template>

<script>
    export default {
        props:["width","callback","data"],
        data() {
            return {
                isIndex: 0
            }
        },
        methods: {
            changeIndex(index,detailCode){
                this.isIndex = index
                this.$emit('callback', index,detailCode)
            }
        }
    }
</script>

<style scoped>
    .tab-box{
        height: .75rem;
        overflow: hidden;
    }
    .ls_tab{
        height: .8rem;
        display: -webkit-box;
        overflow-x: scroll;
        -webkit-overflow-scrolling:touch;
        background: #fff;
        width: 100%;
    }
    .ls_tab div{
        line-height: .6rem;
        padding: 0 .2rem;
        font-size: .26rem;
        color: #555555;
        font-family: "PingFangSC-Regular";
        font-weight: 500;
    }
    .ls_tab div span{
        display: inline-block;
        line-height: .6rem;
    }
    .ls_tab div span.active{
        color: #FF4691;
        font-weight: bold;
        border-bottom: 2px solid #FF4691;
    }

    .tab-box{
        padding: 0 .2rem;
        background: #fff;
        display: flex;
        display: -webkit-flex;
    }
    .all{
        width: .84rem;
        margin-left: .2rem;
        text-align: center;
        line-height: .34rem;
        font-size: .24rem;
        color: #FF4691;
        flex-shrink:0;
        -webkit-flex-shrink:0;
        line-height: .6rem;
    }
    .all span{
        width: 100%;
        padding: .05rem .1rem;
        border: 1px solid #FF4691;
        border-radius: .05rem;
    }
</style>