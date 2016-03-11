<template lang="jade">
ul.tab-container
  li.tab(v-for="menu in menus" v-bind:class="{active:menu.active}" @click="active($event,menu)")
    .swc-full-container(style="position:absolute;")
      .swc-table-container
        .swc-table-cell.tabtext
          |{{menu.text}}
</template>

<style lang="less">  
  
</style>

<script lang="babel">  


  export default {
    data : ()=>{
      return {
      }
    },
    props:['menus'],
    methods:{
      active:function($event,menu){
        $event.preventDefault()
        $event.stopPropagation()
        if(menu.active) return
        this.menus.forEach(function(m){
          m.active = false
        })
        menu.active = true
        console.log(32,menu.href);
        this.$route.router.go(menu.href)
      }
    },
    events: {

    },
    components: {
    }
  }
</script>
