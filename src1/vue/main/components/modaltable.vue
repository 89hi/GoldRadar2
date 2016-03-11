<template lang ="jade">
span.label.label-primary {{title}}
table.table.table-fixed
	thead
		tr
			th(v-for="headvalue in heads") {{headvalue}}
	tbody
		tr(v-for="obj in data") {{ $index }}
			td(v-for="tdvalue in obj" track-by='$index') {{tdvalue}}

</template>

<style lang = 'less'>

</style>

<script lang = 'babel'>
	export default {
		data: ()=>{
			return {
				title:'客户实时持仓数据:',
				heads:['序号','推送时间','交易账号','客户名称','商品','持仓量','买卖方向','成交金额','浮动盈亏'],
				data:[
					[1,0,1,7,1,4,1,3,1],
					[1,0,1,7,1,4,1,3,1],
					[1,0,1,7,1,4,1,3,1],
					[1,0,1,7,1,4,1,3,1],
					[1,1,1,7,1,4,1,3,1],
					[1,0,1,7,1,4,1,3,1],
					[1,0,1,7,1,4,1,3,1],
					[1,1,1,7,1,4,1,3,1]
				]
			}
		},
		ready:function(){
			$(".table tbody").css('width','100%');
		}
	}
</script>