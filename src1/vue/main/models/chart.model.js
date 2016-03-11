import DateUtil from  '../../common/services/date.service.js'
import storage from   '../../common/services/storage.service.js'

var alltime = [{
  t1:'m1',t2:'1'
},{
  t1:'m5',t2:'5'
},{
  t1:'m30',t2:'30'
},{
  t1:'hour',t2:'60'
},{
  t1:'day',t2:'1day'
}]

var piedata = [
  {name:'实时多',y:0,tm:0,color: 'rgb(211, 12, 73)',hidelegend:true},
  {name:'实时空',y:0,tm:0,color: 'rgb(12, 211, 67)',hidelegend:true}
]

class SwcChart{
  constructor($el,param,loader,title,id,owner){
    this.param = param
    this.parseParam(param)
    this.id = id
    this.index = 0;
    this.rangeSelector = 0; 
    this.mode = 0;
    this.filterTimes = [];
    this.owner = owner;
    (owner.rangeSelcetd != undefined ) && (this.rangeSelector = owner.rangeSelcetd);
    (owner.timeindex != undefined )&&(this.index = owner.timeindex);
    (owner.mode != undefined )&&(this.mode = owner.mode);
    (owner.filterTimes != undefined) && (this.filterTimes = owner.filterTimes)
    this.serieNames = {
      'duo':{
        index:-1,
        option:{
          name:'多头寸',
          color: '#d30d48', 
          data:[],
          yAxis:1,
          dataGrouping: { //把数据合并，比如纵向的位置显示不了所有数据了，会把其中一些数据点合并成一个，数值可以计算为两个数据的平均值，也可以计算为两个数据之和
            enabled: false
          }
        }
      },
      'kong':{
        index:-1,
        option:{
          name:'空头寸',
          color: '#28a70b',
          yAxis:1,
          data:[],
          dataGrouping: { 
            enabled: false
          }
        }
      },
      'diff':{
        index:-1,
        option:{
          name:'净头寸',
          color:'#8b8c2c',
          yAxis:2,
          data:[],
          dataGrouping: { 
            enabled: false
          }
        }
      },
      'die':{
        index:-1,
        option:{
          name: '叠加行情',
          type: 'candlestick',
          data:  [],
          color: '#d30d48',  
          upColor: '#28a70b',  
          lineColor: '#d30d48',                 
          upLineColor: '#28a70b',
          yAxis:0,
          dataGrouping: { 
            enabled: false
          }
        },
        type:'array'
      },
      'percent':{
        index:-1,
        option:{
          name: '多空比',
          color:'#FD7924',
          type:'line',
          yAxis:3,
          data:[],
          dataGrouping: { 
            enabled: true,
            approximation:'average'
          }
        }
      }
    }
    this.dataLoader = loader 
    // this.chart = echarts.init($el)
    // this.chart =  new Highcharts.StockChart(this.getOption())
    this.title = 'Echart'
    title && (this.title = title)
    var opt = $.extend({},SwcChart.defaultOpt)
    opt.title.text = this.title
    opt.chart.renderTo = this.id
    opt.rangeSelector.selected = this.rangeSelector;
    //opt.navigator.xAxis.labels.formatter = this.dateFormat(this.mode);
    //opt.xAxis.labels.formatter = this.xAxisFormat(this.mode,this.filterTimes);
    opt.series = this.initSeries()
    this.chart =  new Highcharts.StockChart(opt)
  }
  dateFormat(mode){
    if(mode == '1'){
      return Highcharts.dateFormat('%Y-%m',this.value);
    }
    return Highcharts.dateFormat('%H:%m',this.value);
  }
  getWorkDay(startday,endday){
     var beginDate = new Date(startday.replace(/-/g, "/"));  
      //结束日期
      var endDate = new Date(endday.replace(/-/g, "/"));  
      //日期差值,即包含周六日、以天为单位的工时，86400000=1000*60*60*24.
      var workDayVal = (endDate - beginDate)/86400000;  
      //工时的余数
      var remainder = workDayVal%7;  
      //工时向下取整的除数
      var divisor = Math.floor(workDayVal / 7);  
      var weekendDay = 2 * divisor;  
        
      //起始日期的星期，星期取值有（1,2,3,4,5,6,0）
      var nextDay = beginDate.getDay();  
      //从起始日期的星期开始 遍历remainder天
      for(var tempDay = remainder; tempDay>=1; tempDay--) {  
          //第一天不用加1
          if(tempDay == remainder) {  
              nextDay = nextDay + 0;  
          } else if(tempDay != remainder) {  
              nextDay = nextDay + 1;  
          }  
          //周日，变更为0
          if(nextDay == 7) {  
              nextDay = 0;  
          }  
        
          //周六日
          if(nextDay == 0 || nextDay == 6) {  
              weekendDay = weekendDay + 1;  
          }  
      }  
      //实际工时（天） = 起止日期差 - 周六日数目。
      workDayVal = workDayVal - weekendDay;  
      return workDayVal;
  }
  xAxisFormat(mode,filterTimes){
    var label = null,fmthis = this;
    if(mode == 0){
      var isvalid = true;
      filterTimes.forEach(function(ft){
        if(fmthis.value > ft.startTime && fmthis.value < ft.endTime){
          isvalid = false;
        }
      })

      if(isvalid){
          return Highcharts.dateFormat('%H:%M',this.value);;
      }else{
        return ''
      }
    }

    return Highcharts.dateFormat('%m/%d',this.value);
  }
  parseParam(param){

    (param.rangeSelcetd != undefined ) && (this.rangeSelector = param.rangeSelcetd);
    (param.timeindex != undefined )&&(this.index = param.timeindex);
    (param.mode != undefined )&&(this.mode = param.mode);

    if(!this.timeunits) {this.timeunits = []}
    else{ this.timeunits.splice(0,this.timeunits.length)}

    // this.timeunits = $.parseJSON(JSON.stringify(alltime));
    for(var i in param.lidu){
      if(param.lidu[i]!=undefined){
        this.timeunits.push(alltime[i])
      }
    }

    param.param1.dimension = this.timeunits[param.index].t1
    param.param3.dimension = this.timeunits[param.index].t1
    param.param4.dimension = this.timeunits[param.index].t1
    param.param2.quotationType = this.timeunits[param.index].t2

    if(this.mode === 1){
      this.limit = this.getWorkDay(this.owner.askstartTm,this.owner.askTm);
    }
  }
  reload(config){
    this.param = config
    this.parseParam(config)
    // this.resetSeries()
    this.updateChart()
    this.loadData()
  }
  initSeries(){
    var series = [],index = 0,curSerie
    for(var name in this.serieNames){
      curSerie = this.serieNames[name]
      series.push(curSerie.option)
      curSerie.index = index
      index++
    }
    return series
  }
  resize(){
    this.chart.reflow()
  }
  resetSeries(){
    var curSerie
    for(var name in this.serieNames){
      curSerie = this.serieNames[name]
      curSerie.option.data.splice(0,curSerie.option.data.length)
    }
  }
  loadData(callback){
    // this.chart.showLoading('加载中...')
    var res1,res2,res3,res4,dt = new Date()
    this.param.param1.tradeDateEnd = DateUtil.format(dt,'yyyy-MM-dd') 
    this.param.param3.tradeDateEnd = DateUtil.format(dt,'yyyy-MM-dd')
    this.param.param4.tradeDateEnd = DateUtil.format(dt,'yyyy-MM-dd')
    this.dataLoader.getPositionSummaries(this.param.param1)
    .then((res)=>{
      if(!res.data || !res.data.details ||!res.data.latestData){
        // this.chart.hideLoading()
        return 
      } 
      res1 = res
      // res1 = JSON.parse(JSON.stringify(res))
      var pm2 = this.param.param2
      if(pm2.quotationType === '1day'){ //多空数据
        pm2.quotationType = '1'
        pm2.limit = this.limit
        pm2.trandedate = DateUtil.format(dt,'yyyyMMdd') 
        return this.dataLoader.getDkData(pm2) 
      }
      return this.dataLoader.getMkData(pm2) //获取行情数据
    })
    .then((res)=>{
      res2 = JSON.parse(res)

      var pm3 = this.param.param3

      try{
        this.data2Series(res1.data,res2.datas)
        callback && callback();
      }catch(e){
        console.log(e)
      }
      // this.chart.hideLoading()
    })
  }
  PositionSummaries2Series(data){
    var now = new Date();
    var lastDt = now.getTime(),piedata = [],timeData = [],tmpduokongbi,tmpsell
    if(data.latestData&&(data.latestData.length == 2)){
      if(data.latestData[0].timestamp){
        lastDt = data.latestData[0].timestamp;
      }else if((data.latestData.length == 2)&&data.latestData[1].timestamp){
        lastDt = data.latestData[1].timestamp;
      }
    }else if(data.latestData&&(data.latestData.length == 1) && data.latestData[0].timestamp){
      lastDt = data.latestData[0].timestamp;
    }
    data.details.forEach((data,index)=>{
      if(data.timestamp <= lastDt){
        tmpsell = data.sell > 0 ? -data.sell : data.sell
        this.serieNames.duo && (this.serieNames.duo.option.data.push({
          y:data.buy,
          x:data.timestamp
        }))
        this.serieNames.kong && (this.serieNames.kong.option.data.push({
          y:tmpsell,
          x:data.timestamp
        }))
        this.serieNames.diff && (this.serieNames.diff.option.data.push({
          y:data.net,
          x:data.timestamp
        }))
        if(tmpsell == 0){
          tmpduokongbi = 0
        }else{
          tmpduokongbi = (data.buy/tmpsell)*(-100)
        }
        this.serieNames.percent && (this.serieNames.percent.option.data.push({
          y:tmpduokongbi,
          x:data.timestamp
        }))
      }else{
        this.serieNames.kong && (this.serieNames.kong.option.data.push({
          y:null,
          x:data.timestamp
        }))
      }
      this.serieNames.diff && (this.serieNames.diff.option.data.push({
        y:null,
        x:data.timestamp
      }))
      timeData.push({
        x:data.timestamp,
        y:0
      })
    })
    piedata = data.latestData
    piedata && (this.parseShiShiData(piedata))
    return timeData
  }
  parseShiShiData(latest){
    // console.log('piedata:',latest)
    var _this = this,shishiData = [];
    if(latest&&(latest.length <=0 )){
      return;
    }
    shishiData[0] = {name:'实时多',y:0,tm:0,color: 'rgb(211, 12, 73)',hidelegend:true};
    shishiData[1] = {name:'实时空',y:0,tm:0,color: 'rgb(12, 211, 67)',hidelegend:true};
    var tm = latest[0].timestamp,
        sell = 0,
        buy = 0;
    latest.forEach(function(obj,index,arr){
      buy += obj.buy;
      sell += obj.sell;
    });
    
    var tm = latest[0].timestamp;
    if(shishiData[0].tm < tm){
      shishiData[0].tm = tm;
      shishiData[1].tm = tm;
    }
    shishiData[0].y = Math.abs(buy);
    shishiData[1].y = Math.abs(sell);
    this.piedata = shishiData;
  }
  updateChart(){
    var index = 0
    this.chart.series[this.chart.series.length-1].setData(this.timeArr,false)
    for(var name in this.serieNames){
      // if(index == )
      SwcChart.updateSeries(this.chart.series,index,SwcChart.sortArray(this.serieNames[name]))
      index++
    }
    this.chart.series[this.chart.series.length-1].setData(this.timeArr,true)
  }
  data2Series(data,mkdatas){
    var diedataarr = []
    this.resetSeries()
    this.timeArr = this.PositionSummaries2Series(data)
    this.serieNames.die && (this.serieNames.die.option.data = mkdatas.map(function(obj){
      var tmpdate,tmparr = [],date
      if(obj.tradedate.length === 8){
        tmpdate = (obj.tradedate+' 00:00:00').split("")
      }else{
        tmpdate = obj.tradedate.split("") 
      }
      tmpdate.splice(4,0,'/')
      tmpdate.splice(7,0,'/')
      date = new Date(tmpdate.join(''))   
      // console.log('date',date,tmpdate)        
      tmparr.push(date.getTime())
      tmparr.push(obj.open)
      tmparr.push(obj.high)
      tmparr.push(obj.low)
      tmparr.push(obj.close)
      return tmparr
    })) 
    // console.log('timeArr:',this.timeArr)
    this.updateChart()
  }
  destroy(){
    this.chart.destroy()
  }
}

SwcChart.updateSeries = (series,index,data)=>{
  if(index >= series.length-1 || index < 0) return

  series[index].setData(data,false)
// console.log(377,index,data.length);
}

SwcChart.sortArray = (serieName)=>{
  if(!serieName) return
  if(!serieName.type) return serieName.option.data
  serieName.option.data.sort(function(a,b){
    return a[0] - b[0]
  })
  return serieName.option.data
}

SwcChart.defaultOpt = {
          chart:{
            // renderTo:_this.chartopt.id,
            backgroundColor:'rgba(0,0,0,0)',
            type:'column',//areaspline
            events:{
              load:function(){
                // _this.updateInterval > 0 && (_this.daojishi());
              }
            }
          },
          title:{
            // text:_this.title + ((this.msg_title&&this.msg_content)?'&nbsp;<img src="../../img/annotate.png" class="msg" style="width: 20px;height: 17.5px;"/>':''),
            style:{
              color:"#b2bae2",
              fontFamily: 'simyou'
            },
            useHTML:true
          },
          credits:{
            enabled:false
          },
          navigator:{
            enabled:true,
            outlineWidth:1,
            outlineColor:'#565d7c',
            xAxis: {
                gridLineWidth: 0,
                // gridLineColor:'rgb(118, 109, 109)', 
                // endOnTick:false,
                labels: {
                    align: 'center',
                     formatter:function(){
                      // if(_this.mode == '1'){
                      //   return Highcharts.dateFormat('%Y-%m',this.value);
                      // }
                      // console.log('this.axis.closestPointRange:',this.axis.closestPointRange);
                      if(!this.axis.closestPointRange || (this.axis.closestPointRange>3600000) ){
                         return Highcharts.dateFormat('%Y-%m',this.value);
                      }
                      return Highcharts.dateFormat('%H:%M',this.value);
                    },
                    style:{
                      color:'#7ab6ed'
                    }
                },
                // showFirstLabel: false
                // showLastLabel:false
            },
            yAxis: {
              // min:1000000
            },
            maskFill:'rgba(57, 65, 92, 0.68)',
            handles:{
              // backgroundColor:'rgb(184, 101, 23)',
              backgroundColor:'none',
              borderColor:'none',
              borderWidth:0,
              // borderColor:'rgba(79, 112, 165,0)'
              // borderColor:'rgb(79, 112, 165)'
            },
            series:{
                name:'nothing',
                color:'rgb(255, 255, 255)',
                data:[]
            }
          },
          scrollbar:{
            enabled:true,
            barBackgroundColor: 'none',
            barBorderRadius: 7,
            barBorderWidth: 0,
            buttonArrowColor:'none',
            buttonBackgroundColor: 'none',
            buttonBorderWidth: 0,
            buttonBorderRadius: 7,
            trackBackgroundColor: 'none',
            trackBorderWidth: 0,
            trackBorderRadius: 8,
            trackBorderColor: 'rgb(68, 67, 66)',
            height:0
          },
          rangeSelector : { //缩放组件一行，里面包括按钮（点击后直接缩放到指定大小）、日期输入框（输入后只显示指定日期之间的缩放大小）
            // enabled:true,
            hide:true,
            buttons: [{ //这是定义按钮的
              type: 'day',
              count: 1,
              text: '一天'
            },{ //这是定义按钮的
              type: 'all',
              count: 1,
              text: '全部'
            }],
            // selected : this.rangeSelected,默认选择上面按钮中的哪个按钮，0表示第一个
            inputEnabled: false
          },
          xAxis: {
              tickWidth:0,
              lineWidth:0,
              labels:{
                style:{
                  color:'#3b435b'
                },
                formatter: function() {
                  if(!this.axis.closestPointRange || (this.axis.closestPointRange>3600000) ){

                     return Highcharts.dateFormat('%m/%d',this.value);
                  }
                  return Highcharts.dateFormat('%H:%M',this.value);
                }
              },
              showFirstLabel: true,
              showLastLabel:true
          },
          legend:{
            enabled:true,
            verticalAlign:'top',
            floating:true,
            borderWidth:0,
            itemStyle:{
              color:"#94a2d9",
              fontFamily: 'simyou',
              fontSize:"1em"
            },
            y:40
          },
          yAxis: [{
              labels: {
                  formatter: function () {
                    return this.value;
                  },
                  style:{
                    color:'#3b435b'
                  }
              },
              title:'叠加行情',
              top: '25%',
              height:'25%',
              plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#3b435b'
              }],
              gridLineWidth:1,
              gridLineColor:'#232634'
          },{
              labels: {
                  // formatter: function () {
                  //    return _this.parseLabel(this.value);
                  // },
                  style:{
                    color:'#3b435b'
                  }
              },
              title:'多空头寸',
              top: '50%',
              height:'25%',
              // lineWidth:,
              plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#3b435b'
              }],
              gridLineWidth:1,
              gridLineColor:'#232634'
          }, {
              labels: {
                  // formatter: function () {
                  //     return _this.parseLabel(this.value);
                  // },
                  style:{
                    color:'#3b435b'
                    // fontFamily: 'helvet'
                  }
              },
              title:'净头寸',
              top: '75%',
              height: '25%',
              plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#3b435b'
              }],
              gridLineWidth:1,
              gridLineColor:'#232634'
          },{
              labels: {
                  formatter: function () {
                     return this.value+'%';
                  },
                  style:{
                    color:'#3b435b'
                  }
              },
              title:'多空比',
              top: '0%',
              height:'25%',
              plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#3b435b'
              }],
              gridLineWidth:1,
              gridLineColor:'#232634'
          }],

          plotOptions: {
              series:{
                turboThreshold:0
              },
              column:{
                borderWidth:0,
                pointPadding:0
                // pointWidth:3
              }
          },

          tooltip: {
              // formatter:function(){
    
              // },
              shared: true,
              backgroundColor:'#424964',
              borderWidth:0,
              useHTML:true,
              valueDecimals: 2,
              crosshairs:[true,true],
              style: {
                fontFamily: 'simyou',
                color:'rgb(234, 226, 226)'
              }
          }
}


Highcharts.setOptions({
    global : {
        useUTC : false
    }
})

export default SwcChart