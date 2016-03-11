<template lang="jade">

div(id='zmd' style="position:relative" v-on:mouseenter="clearTimer()" v-on:mouseleave="setTimer()" v-on:click="alertWindow")
	div(id='zmdcontent' style='width:auto') 测试走马灯到底能不能走

</template> 
<style lang="less">
  
</style>

<script lang="babel">   
	import { modal } from 'vue-strap'
	export default {
		data:function(){
			return {
				largeModal:false,
				msg:'this is a test'
			}
		},
		methods:{
			que:function(){
				if(this.$zmdcontent == undefined || this.$zmd == undefined){
					return ;
				}
				var left = this.$zmdcontent.position().left,allwidth = this.$zmd.width();
				if(left < 10){
					this.righttmp = -270;
					this.$zmdcontent.css('right','0px')
				}else{
					this.righttmp += 1;
					this.$zmdcontent.css('right',this.righttmp+'px')
				}
			},
			setTimer:function(){
				this.timer = setInterval(this.que,10);
			},
			clearTimer:function(){
				this.timer&&(clearInterval(this.timer),this.timer=null);
			},
			alertWindow:function(){
				var data = {
					showModal:true
				}
				this.$root.$broadcast("boardAlert",data)
			/*	$.smallBox({
					title : "1Big Information box",
					content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
					color : "#5384AF",
					//timeout: 8000,
					icon : "fa fa-bell"
				});

				$.smallBox({
					title : "2Big Information box",
					content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
					color : "#5384AF",
					//timeout: 8000,
					icon : "fa fa-bell"
				});

				$.smallBox({
					title : "3Big Information box",
					content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
					color : "#5384AF",
					//timeout: 8000,
					icon : "fa fa-bell"
				});

				$.smallBox({
					title : "4Big Information box",
					content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
					color : "#5384AF",
					//timeout: 8000,
					icon : "fa fa-bell"
				});

				$.smallBox({
					title : "5Big Information box",
					content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
					color : "#5384AF",
					//timeout: 8000,
					icon : "fa fa-bell"
				});

				$.smallBox({
					title : "6Big Information box",
					content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
					color : "#5384AF",
					//timeout: 8000,
					icon : "fa fa-bell"
				});

				$.smallBox({
					title : "7Big Information box",
					content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
					color : "#5384AF",
					//timeout: 8000,
					icon : "fa fa-bell"
				});

				$.smallBox({
					title : "8Big Information box",
					content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
					color : "#5384AF",
					//timeout: 8000,
					icon : "fa fa-bell"
				});

				$.smallBox({
					title : "Big Information box",
					content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
					color : "#5384AF",
					//timeout: 8000,
					icon : "fa fa-bell"
				});

				$.smallBox({
					title : "9Big Information box",
					content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
					color : "#5384AF",
					//timeout: 8000,
					icon : "fa fa-bell"
				});*/
			}
		},
		ready:function(){
			var _this = this;
			this.$zmd = $(this.$el).find('#zmd')
			this.$zmdcontent = $(this.$el).find('#zmdcontent')
			this.contentWidth = this.$zmdcontent.width();
			this.righttmp = 0;
			//console.log(38,this.righttmp);
			this.timer = setInterval(_this.que,10);


		},
		beforeDestroy:function(){
			this.timer&&(clearInterval(this.timer),this.timer=null);
		},
		components: {
      "modal":modal
    }
	}
</script>