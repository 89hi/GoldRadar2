<template lang="jade">
.swc-table-container.login(style="height:100%;")
  .swc-table-cell(align='center', style='padding-bottom:10%;', tabindex='-1')
      .login-form-container(style='overflow:hidden;')
        // <div class="login-modal">abc</div>
        .swc-login-form.ytxanimated.fadeIn
          .swc-form-title
            div(style='text-align:center;') Gold Radar G.R.
            div(style='text-align:right;font-size:0.6em;  height: 1.2em;\
            line-height: 1.2em;') 黄金雷达系统
          .swc-input-group.swc-table-container
            input(type='text', placeholder='Username', name='username', v-model='user.username')
            input(type='password', placeholder='Password', name='password', v-model='user.password', style='margin-top:3em;')
            .remember(style='padding-top: 1.2em;')
              div(style='position: absolute;padding-left:2em;') 记住密码
              input.checkbtn(style="position: absolute;" name="rememberme" type="checkbox" v-model='user.ischeck'  )
            .swc-submit-btn(@click="login")
              | Login
        .swc-tip.swc-bottom-tip.error.ytxanimated.slideInUp(v-show="errmsg != ''")
          .errorMsg(v-text="errmsg") 
</template>

<style lang="less"> 
  
</style>

<script lang="babel">

  // import Panel from './components/panel.vue'
  import rememberService from './services/remember.service.js'
  import $http from '../common/services/http.service.js'
  import router from  '../common/services/router.service.js'
  // 
var showMsg = (vue,msg)=>{
  vue.errmsg = msg
  setTimeout(()=>{
    vue.errmsg = ''
  },2000)
}
  
  export default {
    data : ()=>{
      var user = rememberService.load()
      return {
        user:user,
        errmsg:''
      }
    },
    methods:{
      login:function(){
        if(this.user.ischeck){
          rememberService.save(this.user)
        }else{
          rememberService.forgot(this.user)
        }
        console.log('before post do-login')
        $http.post('do-login',{
          username:this.user.username,
          password:this.user.password,
          "remember-me":"on",
          platform:'GR_MONITOR'
        }).then((response) => {
          console.log('in ok')
          if(response.state){
            rememberService.login()
            router.go('/main')
          }else{
            // console.log('response.msg :',response.msg)
            showMsg(this,response.msg)
          }
        }, (err) => {
          showMsg(this,response.msg)
        })
      }
    },
    events: {

    },
    components: {
      // "panel":Panel 
    }
  }
</script>
