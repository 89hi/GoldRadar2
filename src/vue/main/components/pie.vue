<template lang="jade">
section(style='flex:1')
	div(id="{{chartsopt.index}}" style="height:176px")
</template>

<style lang="less">

</style>

<script lang="babel">
	  import PieChart from '../models/pie.model.js'  
	  import DataLoader from '../models/data.model.js' 
		
		var piedata = [
		  {name:'实时多',y:0,tm:0,color: 'rgb(211, 12, 73)',hidelegend:true},
		  {name:'实时空',y:0,tm:0,color: 'rgb(12, 211, 67)',hidelegend:true}
		]

	  export default {
	  	dara : ()=>{
	  		return {
	  			piedata:piedata
	  		}
	  	},
	  	props:['chartsopt'],
	  	methods:{
	  		genChart:function(){
	  			this.chart = new PieChart(this.$el,this.chartsopt.text,this.piedata,this.chartsopt.index+'');

	  			this.chart.loadData();
	  		}
	  	},
		  events: {
			 	'updatepiedata':function(index,data){
			 		if(index == this.chartsopt.index){
			 			this.piedata = data;
			 			this.chart.piedata = this.piedata
			 			this.chart.chart.series[0].setData(data,true);
			 		}
	      },
	      'resize':function(){

	      },
	      'reload':function(){
	      	console.log('chart reload');
	      	this.chart&&this.chart.destroy()
	      	this.genChart();
	      }
	    },
	  	ready:function(){
	  		this.genChart()
	  	},
	  	beforeDestroy:function(){
	  		this.chart && this.chart.destroy();
	  	},
	  	components:{

	  	}

	  }
</script>