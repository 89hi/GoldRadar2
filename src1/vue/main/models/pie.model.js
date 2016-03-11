import DataUtil from  '../services/data.service.js'

var piedata = [
  {name:'实时多',y:0,tm:0,color: 'rgb(211, 12, 73)',hidelegend:true},
  {name:'实时空',y:0,tm:0,color: 'rgb(12, 211, 67)',hidelegend:true}
]

class PieChart{
	constructor($el,title,data,id){
		this.title = 'Echart'
		this.id = id 
    this.piedata = piedata
		title&&(this.title = title)
    data&&(this.piedata=data)
		var opt = $.extend({},PieChart.default);
		opt.title.text = this.title
    opt.chart.renderTo=id
    console.log('id',id);
		// opt.chart.renderTo = this.initSeries()
		opt.series = [{
          name:'',//_this.data[id+''].data.name,
          data:this.piedata//_this.data[id+''].data.data
        }]
		this.chart = new Highcharts.Chart(opt);
	}
	loadData(){
		// this.
	}
  destroy(){
    this.chart.destroy()
  }
}


PieChart.default = {
        chart: {
            backgroundColor:'rgba(0,0,0,0)',
            // renderTo:id,
            type: 'pie',
            margin:[0,0,0,0],
            // width:chartwidth,
            // height:chartheigth
        },
        title: {
            // text: _this.data[id+''].name,
            style:{
              color:"#b2bae2",
              fontFamily: 'simyou',
              font:'0.7em'
            }
        },
        credits:{
            enabled:false
        },
        tooltip: {
              formatter:function(){
                var fmt = '%Y-%m-%d %H:%M:%S';
                if(this.x == undefined){
                  var tmparr = Highcharts.dateFormat(fmt,this.point.tm).split(' ');
                  return tmparr[0]+'<br>'+tmparr[1]+'<br/><span style="font-size:10px;color:'+this.color+'">'+this.key+'</span>:<b>'+DataUtil.parseLabel(this.y)+'</b>';
                }
                var tm = this.points[0].point.tm;
                var hideflg = true;
                if(_this.data[id+''].mode == '1'){
                  fmt = '%Y-%m-%d';
                }
                var addhead = false,html = '';
                if(tm != null && tm != 0){
                  var tmparr = Highcharts.dateFormat(fmt,tm).split(' ');
                   html += '<span style="font-size: 10px:color:black;">'+tmparr[0]+'<br>'+tmparr[1]+'</span><br/>';
                }
                this.points.forEach(function(point,i){
                  if(point.point.hide){
                    return;
                  }
                  if(point.point.tm != null && point.point.tm != 0){
                    hideflg = false;
                  }

                  if(point.point.dieflg == true  && !addhead){
                    var tmparr = Highcharts.dateFormat(fmt,point.point.tm).split(' ');
                    html += '<span style="font-size: 10px:color:black;">'+tmparr[0]+'<br>'+tmparr[1]+'</span><br/>';
                    addhead = true;
                  }
                  html += '<span style="color:'+point.series.color+'">'+point.series.name+'</span>: <b>'+DataUtil.parseLabel(point.y)+'</b><br/>';
                });
                if(hideflg == true){
                  return false;
                }
                return html;
              },
              backgroundColor:'#424964',
              borderWidth:0,
              useHTML:true,
              valueDecimals: 2,
              crosshairs:[true,true],
              style: {
                fontFamily: 'simyou',
                color:'rgb(234, 226, 226)'
              }
          },
        plotOptions: {
            pie: {
                borderWidth:0,
                size:'100%',
                center:["50%","60%"],
                showInLegend:true,
                dataLabels:{
                  formatter:function(){
                    return Highcharts.numberFormat(this.percentage,1)+'%';
                  },
                  style:{
                    "fontSize":"0.5em",
                    fontFamily: 'helvet'
                  },
                  distance:-25
                }
            }
        },
        series:[{
        	name:'',//_this.data[id+''].data.name,
        	data:[]//_this.data[id+''].data.data
        }]
			}



export default PieChart