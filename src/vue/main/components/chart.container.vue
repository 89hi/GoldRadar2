<template lang="jade">
section.flex-column.chart-container(style="background:#181c23;" @dblclick="dblclick()" v-bind:class="{ max: maxFlg }")
  echart(v-bind:chartopt="chartopt")
  router-view
</template>

<style lang="less"> 
  
</style>

<script lang="babel"> 

  import Echart from './chart.vue'
  export default {
    data : ()=>{ 
      return {
        maxFlg:false
      }
    },
    props:['chartopt','minflg'],
    methods:{
      dblclick:function(){
        this.maxFlg = !this.maxFlg
        this.minflg = !this.minflg
        this.$nextTick(()=>{
          this.$root.$broadcast('resize')
        })        
        this.$root.$broadcast('changeSid',this.chartopt);
      }
    },
    events: {
   
    },
    ready:function(){
      //console.log('chartopt:',this.chartopt);
    },
    components: {
      "echart" : Echart
    }
  }
</script>
