
<template lang="jade">
router-view
</template>

<script lang="babel">


  export default {
    data() {
      return {}
    },
    events: {

    },
    ready:function(){
      var _this = this
      window.onresize = function(){
        _this.$broadcast('resize')
      }
    },
    components: {

    }
  }
</script>

