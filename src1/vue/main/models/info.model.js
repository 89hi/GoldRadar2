var allData = [
	[{"name":"涨幅","value":""},{"name":"开盘","value":""}],
	[{"name":"涨跌","value":""},{"name":"最高","value":""}],
	[{"name":"均价","value":""},{"name":"最低","value":""}],
	[{"name":"振幅","value":""},{"name":"昨收","value":""}]
];

class HqTable{
	constructor($el,param,loader,activesid,owner){
		this.param = param
		this.dataLoader = loader
		this.name = ''
		this.price = ''
		this.daydata = []
		this.activesid = activesid
		this.allData = allData
		this.owner = owner
	}
	loadData(callback){
		var ret;
		this.clearData()
		this.dataLoader.getOptData(this.param)
		.then((res)=>{
			// console.log(24,res);
			var alldata = $.parseJSON(res)
			var data
			this.alldata = data = alldata
			if(!data || data.length == 0)
				return
		  this.ParseData(data)
		  return (callback && typeof(callback) === "function") && callback()
		});
	}
	ParseData(data){
		var tmp = '',
		    tmpdate,
		    date,
		    index = this.activesid
		var price = data[index].sell + '/' +data[index].buy
		if(parseInt(data[index].sell)<parseInt(data[index].buy)){
			price = '⇈'+price
		}else if(parseInt(data[index].sell)>parseInt(data[index].buy)){
			price = '⇊'+price
		}else{
			price = price
		}
		this.allData[0][0].value = (data[index].percent.indexOf('-')>=0)?('↓'+data[index].percent):('↑'+data[0].percent)//是否为负值？
		this.allData[0][1].value = data[index].open
		this.allData[1][0].value = (data[index].updrop>=0)?('▲'+data[index].updrop):('▼'+data[index].updrop)//是否为负值？
		this.allData[1][1].value = data[index].high
		this.allData[2][0].value = data[index].avg
		this.allData[2][1].value = data[index].low
		this.allData[3][0].value = data[index].amplitude
		this.allData[3][1].value = data[index].preclose

		tmpdate = (data[index].pricetime.substring(0,8)+' 00:00:00').split('')
		tmpdate.splice(4,0,'-')
    tmpdate.splice(7,0,'-')
    date = new Date(tmpdate.join(''))
		tmp = JSON.stringify(this.allData)
		this.allData = $.parseJSON(tmp)
		
		this.name = data[index].name
		this.price = price;
		this.daydata = [
			date.getTime(),
		  data[index].open,
		  data[index].high,
		  data[index].low,
		  data[index].close
		]
		return ;
	}
	clearData(){
		this.price = ''
		this.allData = allData
		this.daydata = []
		this.name = ''
	}
}

export default HqTable