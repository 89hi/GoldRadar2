<template lang="jade">
div.room
  h1 Room lamp is {{status}}
</template>

<style lang="less">
  
</style>

<script lang="babel">
   
  // import rememberService from '../services/remember.service.js'
  var rememberService = require('../services/remember.service.js')
  
  export default {
    data() {
      var user = rememberService.load()
      return {
        user:user
      }
    },
    events: {
      // 'switch-status-change': (status) => {
      //   console.log('switch-status-change', status);
      //   this.status = status;
      // }
    },
    
    components: {

    }
  }
</script>
