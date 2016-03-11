<template lang="jade">
div
	div.iscroll_wrapper(id="tableiscroll" style="height:100%")
		div.iscroll_scroller
			table.hqtable
				tbody
					tr(v-for="(index,item) in itemarr"  style="     textalign:center;position:relative;" )
						td(style="height:25px;position:relative;width:35%;text-align:center; border-spacing: 1;border-collapse: initial;")
								div.tabletdiv.tabletdiv11(v-bind:style="item[0].style;")
								div.tabletdiv.tabletdiv12 {{item[0].value}}
						td(style="height:25px;position:relative;width:30%") {{item[1].value}}
						td(style="height:25px;position:relative;width:35%;text-align:center;border-collapse: initial; border-spacing: 1;") 
								div.tabletdiv.tabletdiv21(v-bind:style="item[2].style")
								div.tabletdiv.tabletdiv22	{{item[2].value}}

</template>

<style lang="less">
</style>

<script lang="babel"> 
	import Config from '../services/config.service.js'
	import Data from '../services/data.service.js'
	import Table from '../models/table.model.js'  
  import DataLoader from '../models/data.model.js' 
  import DateUtil from  '../../common/services/date.service.js'

	export default {
		data : ()=>{
			return {
        chartarr:[1,0,1],
        color:['#CC3300','#fff536','#3399FF'],
        maxarr:[0,0,0],
        minarr:[0,0,0],
        tdWidth:['35%','30%','35%'],
        trHeight:'25px',
        align :['right','center','left'],
        itemarr:[],
        companies:[],
        commodity:'',
			}
		},
		props:['measure','dimension'],
		computed:{
		},
		methods:{
			initData:function(){
				this.companies = this.$parent.$parent.chartsopt[0].companies
				this.commodity = this.$parent.$parent.chartsopt[0].commodity

			},
			getPercent:function(max,value){
				var result = parseFloat(value)/parseFloat(max)*100+'%'
				return result
		  },
			genTable:function(){
		    var _this = this;
		    var param = {
		       limit:50,
		       measure:this.$parent.measure, //person、amount分别代表  人数、金额
		       commodity:this.commodity, //品种， GDAG、AGT+D、AUT+D
		       dimension:this.$parent.dimension, //openPrice、positionPrice
		       companies:this.companies,  
		    }
		    
		    this.table = new Table(this.$el,param,new DataLoader());
		    this.table.loadData(function(){
		    	_this.updateData(_this,_this.table);
		    });

			},
			updateTable:function(){
				var _this = this;
		    var param = {
		       limit:50,
		       measure:this.$parent.measure, //person、amount分别代表  人数、金额
		       commodity:this.commodity, //品种， GDAG、AGT+D、AUT+D
		       dimension:this.$parent.dimension, //openPrice、positionPrice
		       companies:this.companies,  
		    }
		    this.table&&(this.table.param = param) && this.table.loadData(function(){
		    	_this.updateData(_this,_this.table);
		    })
			},
			updateData:function(dest,src){
				/*console.log('22before:',$(this.$el).find('#tableiscroll').height(),$(this.$el).height());
				$(this.$el).find('#tableiscroll').height($(this.$el).height());
				console.log('22after:',$(this.$el).find('#tableiscroll').height(),$(this.$el).height());*/
				dest.maxarr = src.maxarr
				dest.minarr = src.minarr
				dest.itemarr = src.itemarr
				if(!dest.tableiscroll){
					dest.tableiscroll = new IScroll('#tableiscroll',{
		            eventPassthrough: false,
		            scrollY: true, 
		            preventDefault: false,
		            freeScroll:true,
		            mouseWheel: true,
		            scrollbars: true,
		            checkDOMChanges:true
		      });
	      }
				dest.tableiscroll&&dest.tableiscroll.refresh();
			}
		},

		ready:function(){

			this.initData();
			this.genTable();

			this.$watch('measure', function (val) {
				  this.updateTable();
			})
			this.$watch('dimension', function (val) {
				  this.updateTable();
			})
			this.$watch('itemarr', function (val) {
				 	this.tableiscroll&&this.tableiscroll.refresh();
			})
		},
		events:{
			reload:function(){
				this.initData();
				this.genTable();
			}
		},
		destroyed:function(){

			this.tableiscroll&&(this.tableiscroll.destroy(),this.tableiscroll = null)
			this.itemar = [];
			this.maxarr = [];
			this.minarr = [];
		},
		components:{
		}
	}

</script>