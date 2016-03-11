<template lang ="jade">
ul.nav1
	li(v-for="item in companyfilter" v-on:mouseenter="item.active=!item.active" v-on:mouseleave="item.active=!item.active")
		a(href="#" ) {{item.name}}
		ul
			li(v-for="company in item.companies" v-show="item.active")
				a(href="#" v-bind:value="company.value" v-bind:class="{'active':company.active}" v-on:click="company.active=!company.active") {{company.name}}
</template>


<style lang = 'less'>

</style>

<script lang='babel'>
	import Config from '../services/config.service.js'

	export default {
		data : ()=>{
			return {
			}
		},
		props:['companyfilter','companies'],
		methods:{

		},
		ready:function(){
			console.log('companyfilter:',this.companyfilter);
			this.$watch('companyfilter', function(){
				var tmpcompany = [],tmpname = [];
				this.companyfilter.forEach(function(item){
					item.companies.forEach(function(obj){
						if(obj.active){
							tmpcompany.push(obj.value);
							tmpname.push(obj.name);
						}
					})
				});

				if(this.companies.length == tmpcompany.length){
					var eqlflg = true;
					this.companies.forEach(function(item,index){
						if(item != tmpcompany[index]){
							eqlflg = false;
						}
					});
					(!eqlflg) &&(this.companies = tmpcompany,this.$root.$broadcast("reload"));
				}else{
					this.companies = tmpcompany;
					this.$root.$broadcast("changefilter",tmpname,tmpcompany);
				}
			}, {
			  deep: true
			})
		}
	}

</script>