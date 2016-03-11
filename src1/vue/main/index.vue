<template lang="jade">   
header.swc-appheader.swc-move-aside(@mouseenter="show($event)" @mouseleave="hide($event)")
      .swc-table-container(style="background-color: #424964;")
        .swc-table-cell-left(style='width:20%;') 
          // <img class="swc-logo" src="img/logo.png" style="padding-left:2em;"> 
        .swc-table-cell-left.swc-title
        .swc-table-cell-right(style='padding-right:2em;width:20%;')
          a.button.fullscreen(hreaf='javascript:void(0);' @click="fullscreen($event)" v-bind:class="{ active: fullFlg }")  
            i.fa.fa-arrows-alt
          a.button.logout(hreaf='javascript:void(0);')
            i.fa.fa-sign-out
aside.tabs.swc-move-aside(@mouseenter="show($event)" @mouseleave="hide($event)")
  lefttab(v-bind:menus.sync="menus")
section.main-content.swc-full-container(style="background:#181c23;")
  .ytxanimated.fadeIn.swc-full-container
    router-view
      //- echartcontainer(v-for="chart in charts"  v-bind:chartopt="chart" v-bind:minflg.sync="minflg")
      //- infocontainer(@mouseenter="show($event)" @mouseleave="hide($event)")
  //- echart
.swc-model-container  
 
</template>

<style lang="less"> 
  
</style>

<script lang="babel">   
  
  import InfoContainer from './components/info.container.vue'
  import LeftTab from './components/tab.vue'
  
  export default { 
    data : function(){
      var menus = [
        {
          text:'同品种多指标',
          href:"/main/samepz", 
          active:false
        },
        {
          text:'同指标多品种',
          href:"/main/samezb", 
          active:false
        }
      ],_this = this
      menus.forEach(function(m){
        if(m.href === _this.$route.path){
          m.active = true
          return false
        }
      })
      console.log('path :',_this.$route.path)
      console.log('menus :',_this.menus)
      return {
        fullFlg:false, 
        menus:menus 
      }
    },
    methods:{
      show:function($event){ 
        // console.log('event :',$event)
        var $ele = $($event.target) 
        $ele.addClass('show') 
      }
      ,hide:function($event){
        var $ele = $($event.target)
        $ele.removeClass('show')
      }
      ,fullscreen:function($event){
        var $ele = $($event.target),a = document.documentElement
        if(this.fullFlg){
          this.fullFlg = false
          document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
        }else{
          this.fullFlg = true
          a.requestFullscreen ? a.requestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen ? a.webkitRequestFullscreen() : a.msRequestFullscreen && a.msRequestFullscreen();
          
        }
      }
    },
    events: {

    },
    components: {
      "infocontainer":InfoContainer,
      "lefttab":LeftTab
    }
  }
</script>
