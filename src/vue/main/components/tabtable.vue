<template lang="jade">
section.flex-row-bottom
	nav
		ul
			li(v-for="(index,item) in heads")
				a(href="#" v-if="index == activeheads" v-on:click="changeActiveheads(index)" class="checked" value="{{item.value}}") {{item.name}}
				a(href="#" v-else value="{{item.value}}" v-on:click="changeActiveheads(index)") {{item.name}}

	div.swc-flex-row-container.divtablehead
		div(style='flex:1')
			div.head0.tab 多单{{activename}}
		div(style='flex:1')
			div(v-for="(index,item) in head['1']" style="display:inline")
				div(v-if="index == activehead" class="tab active"  v-on:click="changeActivehead('1',index)") {{item.name}}
				div(v-else class="tab"  v-on:click="changeActivehead('1',index)") {{item.name}}
		div(style='flex:1')
			div.head3.tab 空单{{activename}}
		
	ttable(v-ref:profile v-bind:measure="measure" v-bind:dimension="dimension" v-bind:style="{flex:1}")
</template>

<style lang="less">
</style>

<script lang='babel'>
	import Config from '../services/config.service.js'
	import Table from '../components/table.vue'
	export default {
		data : ()=>{
			var heads = JSON.parse(JSON.stringify(Config.heads));
			var head = JSON.parse(JSON.stringify(Config.head));
			var tmpclass = '',tmpvalue = '',activeheads = 0,activehead=0;

			return {
        itemarr:[],
        activeheads:0,
        activehead:0,
        heads:heads,
        head:head
			}
		},
		computed:{
			activename:function(){
				return this.heads[this.activeheads].name
			},
			measure:function(){
				return this.heads[this.activeheads].value
			},
			dimension:function(){
				return this.head[1][this.activehead].value
			},
			tableHeight:function(){
				return '443px';
			}
		},
		methods:{
			changeActiveheads:function(index){
				if(this.activeheads == index)
					return;

				this.activeheads = index;
			},
			changeActivehead:function(key,index){
				if(key !=1) {
					return ;
				}

				if(this.activehead == index)
					return;
				
				this.activehead = index;
				
			}
		},
		ready:function(){
			this.$parent.$parent.curPz&&this.$set('heads',this.$parent.$parent.curPz.heads);
			this.$parent.$parent.curPz&&this.$set('head',this.$parent.$parent.curPz.head);

			this.$parent.$parent.curZb&&this.$set('heads',this.$parent.$parent.charts[0].heads);
			this.$parent.$parent.curZb&&this.$set('head',this.$parent.$parent.charts[0].head);
			console.log(81,this.heads,this.head);
			this.$watch('activehead', function (val) {
				  this.dimension = this.head[1][this.activehead].value;
				  this.$refs.profile.updateTable();
			})
			this.$watch('activeheads', function (val) {
				  this.measure = this.heads[this.activeheads].value;
				  this.$refs.profile.updateTable();
			})
		},
		events:{
			resize:function(){
			},
			changeSid:function(opt){
				this.$set('heads',opt.heads);
				this.$set('head',opt.head);
			},
			reload:function(){
				this.$parent.$parent.curPz&&this.$set('heads',this.$parent.$parent.curPz.heads);
				this.$parent.$parent.curPz&&this.$set('head',this.$parent.$parent.curPz.head);

				this.$parent.$parent.curZb&&this.$set('heads',this.$parent.$parent.charts[0].heads);
				this.$parent.$parent.curZb&&this.$set('head',this.$parent.$parent.charts[0].head);

			}
		},
		components:{
			"ttable":Table
		}
	}
</script>