<template lang="jade">
div.swc-button-group(style="width:100%;height:2%;" )
  a(href="javascript:void(0)" v-for="item in timearr"  v-bind:class="['tabbtn', timeindex==item.index?'active':'']" v-bind:index="item.index" v-bind:tm="item.value" v-on:click="changeTime($event)") {{item.text}}

div.swc-time.ClassyCountdownDemo.countdownHolder(style="font-size:1em;text-align:right;position:absolute;" v-if="daojiflg" id="{{chartopt.id}}time" ) 

.swc-full-container(id="{{chartopt.id}}" style="height:98%")


div.tip_msg.nofocus
  div.tip_title(style="height:30%;line-height:60px")
  div.par_content(style="overflow-y:scroll;height: 70%;")
  div.tip_content
</template>

<style lang="less">
                     
</style>

<script lang="babel">   

  import SwcChart from '../models/chart.model.js'  
  import DataLoader from '../models/data.model.js' 
  import DateUtil from  '../../common/services/date.service.js'
  import Config from '../services/config.service.js' 

  export default {
    data : ()=>{ 

      return {
        updateInterval:1000*60,
        oneDay:24*3600*1000,
        appendFlg:true,
        standTime:1420041600000,
        smallmeasure:['position','close'],
        timearr:[],
        timeindex:0
      }
    },
    watch:{
    'chartopt': {
      handler: function(){
        this.initConfig();
      },
      deep: true
      }
    },
    props:['chartopt'],
    methods:{
      initConfig:function(){
        var ch = '',_this = this;
        this.chartopt.startHour&&( ch = this.chartopt.startHour.charAt(this.chartopt.startHour.lenght-1))
        if(ch == '-'){
          this.xstartflg = 1;
        }else if(ch == '+'){
          this.xstartflg = -1;
        }else{
          this.xstartflg = 0;
        }
        this.lidu = this.chartopt.lidu;
        var timearr = [];
        var minindex,timevalid;
        Config.allLiDu.forEach(function(ld,i){
          if(_this.lidu[i] == true){
            timearr.push(ld);
            if(!minindex){
              if(minindex!=0){
                minindex = ld.index;
              }
            }

            if(_this.chartopt.timeindex == ld.index){
              timevalid = true;
            }
          }
        });

        if(!timevalid){
          this.chartopt.timeindex = minindex
        }
        this.$set('timeindex',this.chartopt.timeindex);
        console.log('timeindex:',this.timeindex);
        this.$set('timearr',timearr);
        this.setCurLidu(this.chartopt.timeindex);

      },
      genChart:function(){
        var _this = this;
        this.chart = new SwcChart(this.$el,{
          param1:{
            measure:this.chartopt.measure,
            commodity:this.chartopt.commodity,
            companies:this.chartopt.companies,
          },param2:{
            sid:this.chartopt.sid,
            sort:'gt',
          },param3:{
            measure:Config.smallmeasure[0],
            commodity:this.chartopt.commodity,
            companies:this.chartopt.companies,
          },param4:{
            measure:Config.smallmeasure[1],
            commodity:this.chartopt.commodity,
            companies:this.chartopt.companies,
          },lidu:this.chartopt.lidu
          ,index:this.chartopt.timeindex
        },new DataLoader(),this.chartopt.cmpname+this.chartopt.msname+this.chartopt.text+'分布',this.chartopt.id,this)
        this.chart.loadData(function(){
          _this.updatePieData(_this.$parent.$parent,_this.chart,_this.chartopt.index);
        })
       
      },
      updatePieData:function(dest,src,index){
        dest.$root.$broadcast('updatepiedata',index,src.piedata)
      },
      setCurLidu:function(index){
        var curlidu = Config.allLiDu[index]
        this.updateInterval = curlidu.value
        this.tickInterval = curlidu.interval;
        this.rangeSelcetd = curlidu.select;
        this.cancelAdd = curlidu.cancelAdd;
        this.mode = curlidu.mode;
        this.dimension = curlidu.dimension;
        this.daojiflg = curlidu.flg;
      },
      getTimeIdentity:function(){
        var _this = this;
        var now = new Date();
        this.startTime = this.parseHour(now,this.chartopt.startHour,this.chartopt.startMinute);
        this.endTime = this.parseHour(now,this.chartopt.endHour,this.chartopt.endMinute);
        this.filter && (this.chartopt.filter.forEach(function(fl,i){
          _this.filterTimes[i] = {
            startTime:_this.parseHour(now,fl.startHour,fl.startMinute),
            endTime:_this.parseHour(now,fl.endHour,fl.endMinute)
          }
        }));
        var ch = this.chartopt.startHour.charAt(this.chartopt.startHour.length-1);
        var curtmpdt = new Date(this.startTime + this.xstartflg*this.oneDay);
        var prevtmptm = new Date(curtmpdt.getTime()-210*24*3600*1000).getTime();
        this.standtm = curtmpdt.setHours(0,0,0,0);
        this.askstartTm = DateUtil.format(new Date(prevtmptm),'yyyy-MM')+'-01';
        this.askTm = DateUtil.format(curtmpdt,'yyyy-MM-dd');
    },
    parseHour:function(dt,hour,minute){
      var oneDay = this.oneDay;
      var tm = dt.getTime();
      var ch = hour.charAt(hour.length-1);

      var tmpDt;
      if(ch == '-'){
        tmpDt = new Date(tm - oneDay);
        tmpDt.setHours(hour.substring(0,hour.length-1),minute,0,0);    
      }else if(ch == '+'){
        tmpDt = new Date(tm + oneDay);
        tmpDt.setHours(hour.substring(0,hour.length-1),minute,0,0);
      }else{
        tmpDt = new Date(tm);
        tmpDt.setHours(hour,minute,0,0);
      }
      return tmpDt.getTime()
    }, 
    changeTime:function(event){
        var curindex = event.target.getAttribute('index');
        $(event.srcElement.parentNode).children().removeClass('active');
        event.target.className = 'tabbtn active';
        this.chartopt.timeindex = curindex;
        this.setCurLidu(curindex);
        this.getTimeIdentity();
        this.chart&&this.chart.destroy()
        this.genChart()
    },
    daojishi:function(){
      var _this = this;
      var now = new Date();
      var left = now.getSeconds()*1000+now.getMilliseconds();
      if(this.$timeel){
         
        this.$timeel.countdown({
          unit:_this.tickInterval,
          flg:_this.daojiflg,
          timestamp : new Date().getTime()+_this.tickInterval-left,
          callback  : function(days, hours, minutes, seconds){
            _this.chart && _this.chart.reload({
              param1:{
                measure:_this.chartopt.measure,
                commodity:_this.chartopt.commodity,
                companies:_this.chartopt.companies,
              },param2:{
                sid:_this.chartopt.sid,
                sort:'gt',
              },param3:{
                measure:Config.smallmeasure[0],
                commodity:_this.chartopt.commodity,
                companies:_this.chartopt.companies,
              },param4:{
                measure:Config.smallmeasure[1],
                commodity:_this.chartopt.commodity,
                companies:_this.chartopt.companies,
              },lidu:_this.chartopt.lidu
              ,index:_this.chartopt.timeindex
        })
            
          }
        });
        

      }
    }
    },
    events: {
      resize:function(){
        this.chart.resize() 
      }
      ,reload:function(){
        this.chart&&this.chart.destroy()
        this.chartopt.timeindex = 0 ;
        this.initConfig();
        this.genChart()
      }
    },
    created:function(){
      this.initConfig();
    },
    ready:function(){
      this.$timeel = $('#'+this.chartopt.id+'time');

      var _this = this;
      this.genChart();
      _this.daojishi();
    },
    attached:function(){
    },
    destroy:function(){
      this.$timeel.countdown('close');
      this.chart && (this.chart.destroy(),this.chart = null);
    },
    components: {
    }
  }
</script>
