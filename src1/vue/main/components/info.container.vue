<template lang="jade">
aside.rightpanel(v-bind:class="{panelspin:spinflg}")
  section.chart-container(style="position:relative;height:100%;background:#181c23;")
    .spin(style="position:absolute;right:0px;top:0px" @click="spin()")
      i.fa.fa-thumb-tack
    section.swc-flex-column-container.detail-container(style='position:relative' )
      info
      distribution(v-bind:chartsopt="chartsopt")
      tabtable
</template>

<style lang="less">  
  
</style>

<script lang="babel">  
  import $root from '../../main.vue'
  import Info from './info.vue'
  import Distribution from './distribution.vue'
  import TabTable from './tabtable.vue'

  export default {
    data : ()=>{
      return {
        spinflg:false
      }
    },
    props:['chartsopt'],
    methods:{
      spin:function(){
        this.spinflg = !this.spinflg
        this.$nextTick(()=>{
          this.$root.$broadcast('resize')
        })
      }
    },
    events: {
    },
    components: {
      "info":Info,
      "distribution":Distribution,
      "tabtable":TabTable
    }
  }
</script>
