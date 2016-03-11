<template lang="jade">
section.flex-row-center(style="height:176px;") 
	div.swc-flex-row-container.flexrow
		pchart(v-for="(index,pie) in piedata" v-bind:chartsopt="chartsopt[index]")
</template>

<style lang="less"> 
  
</style>

<script lang="babel">
	import PieChart from './pie.vue'

	 var piedata = [
    [{name:'实时多',y:0,tm:0,color: 'rgb(211, 12, 73)',hidelegend:true},
    {name:'实时空',y:0,tm:0,color: 'rgb(12, 211, 67)',hidelegend:true}]
    ,[{name:'实时多',y:0,tm:0,color: 'rgb(211, 12, 73)',hidelegend:true},
    {name:'实时空',y:0,tm:0,color: 'rgb(12, 211, 67)',hidelegend:true}]
    ,[{name:'实时多',y:0,tm:0,color: 'rgb(211, 12, 73)',hidelegend:true},
    {name:'实时空',y:0,tm:0,color: 'rgb(12, 211, 67)',hidelegend:true}]
  ]

	export default {
		data : ()=>{
			return {
				piedata:piedata
			}
		},
		props:['chartsopt'],
    methods:{
      
    },
    events: {
    },
    ready:function(){
    },
    components: {
    	'pchart':PieChart
    }
	}

</script>

