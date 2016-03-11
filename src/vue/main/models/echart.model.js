



class SwcChart{
  constructor($el,param,loader,title){
    this.param = param
    this.dataLoader = loader
    this.chart = echarts.init($el) 
    this.title = 'Echart'
    title && (this.title = title)
  }
  resize(){
    this.chart.resize()
  }
  setOption(option){
    if(!option) return
    var opt = $.extend({},SwcChart.defaultOpt)
    opt.title.text = this.title
    if(option.category){
      opt.xAxis.forEach((axis)=>{
        axis.data = option.category
      })
    }
    // option.category && (opt.xAxis[0].data = option.category)
    if(option.series){
      var arr = []
      opt.series = option.series
      option.series.forEach((serie)=>{
        arr.push(serie.name)
      })
      opt.legend.data = arr
    }
    this.chart.setOption(opt)
  }
  loadPositionSummaries(){
    this.chart.showLoading()
    this.dataLoader.getPositionSummaries(this.param,(res)=>{
      this.chart.hideLoading()
      if(!res.data || !res.data.details) return
      this.setOption(SwcChart.PositionSummaries2Series(res.data.details))
    },this)
  }
  loadData(){

  }
}

// series:[{
//             name: '销量',
//             type: 'bar',
//             data: [5, 20, 36, 10, 10, 20]
//         }]

SwcChart.PositionSummaries2Series = (datas)=>{
  var duoData = [],kongData = [],diffData = [],timeData = []
  datas.forEach((data,index)=>{
    // if(index >= 1000){
    //   return false
    // }
    timeData.push(data.timestamp)
    duoData.push(data.buy)
    kongData.push(data.sell)
    diffData.push(data.net)
  })
  return {
    series:[{
      name:'多头寸',
      type:'bar',
      data:duoData
    },{
      name:'空头寸',
      type:'bar',
      data:kongData
    },{
      name:'净头寸',
      type:'bar',
      yAxisIndex:1,
      xAxisIndex:1,
      data:diffData
    }],
    category:timeData,
  }
}

SwcChart.defaultOpt = {
    title: {
      left:'center',
      textStyle:{
        color:"#94a2d9",
        fontFamily: 'simyou', 
        fontSize:"14"
      }
    },
    tooltip: {
      backgroundColor:'#424964',
      borderWidth:0,
      textStyle: {
        fontFamily: 'simyou',
        color:'rgb(234, 226, 226)' 
      },
      trigger:'axis',
      axisPointer:{
        type:'line',//cross
        crossStyle:{
          color:'#94a2d9',
          type:'solid',
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10,
          textStyle:{
            color:'rgba(0,0,0,0)'
          }
        }
      }
    },
    legend: {
      textStyle:{
        color:"#94a2d9",
        fontFamily: 'simyou', 
        fontSize:"1em"
      },
      top:'30'
    },
    xAxis: [
      {
        splitLine:{show:false},
        axisLabel:{
          textStyle:{
            color:'rgba(0,0,0,0)'
          }
        },
        axisLine:{
          show:false
        },
        axisTick:{
          show:false
        }
        
      },{
        gridIndex:1,
        splitLine:{show:false},
        axisLabel:{
          textStyle:{
            color:'#3b435b',
            fontFamily: 'simyou'
          }
        },
        axisLine:{
          show:false
        },
        axisTick:{
          show:false
        }
      }
    ],
    dataZoom: [
        {
            show: true,
            realtime: true,
            start: 0,
            end: 100,
            xAxisIndex: [0, 1]
        },
        {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100,
            xAxisIndex: [0, 1]
        }
    ],
    grid: [{
        show:true,
        left:10,
        right:10,
        height: '35%',
        borderColor:'#444962',
        borderWidth:1
    }, {
        top: '45%',
        height: '35%',
        borderColor:'#444962',
        borderWidth:1
    }],
    yAxis: [
      {
        splitLine:{
          lineStyle:{
            color:'#232634'
          }
        },
        axisLabel:{
          textStyle:{
            color:'#3b435b',
            fontFamily: 'simyou'
          },
          // formatter: (value, index) => {
          //     // 格式化成月/日，只在第一个刻度显示年份
          //     var date = new Date(value);
          //     var texts = [(date.getMonth() + 1), date.getDate()];
          //     if (idx === 0) {
          //         texts.unshift(date.getYear());
          //     }
          //     return texts.join('/');
          // },
          inside:true
        },
        axisLine:{
          show:false
        },
        axisTick:{
          show:false
        }
      },{
        gridIndex:1,
        splitLine:{
          lineStyle:{
            color:'#232634'
          }
        },
        axisLabel:{
          textStyle:{
            color:'#3b435b',
            fontFamily: 'simyou'
          },
          inside:true
        },
        axisLine:{
          show:false
        },
        axisTick:{
          show:false
        }
      }
    ],
    animation:false
}




export default SwcChart