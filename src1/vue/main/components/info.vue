<template lang="jade">
section(style="height:176px;")
  table.hqtable
    thead
      tr
        td(colspan="4") {{name}}
    tbody
      tr
        td(colspan="4")
          .red {{price}}
      tr
        td 涨幅 
        td {{allData[0]?allData[0][0].value:''}}
        td 开盘 
        td {{allData[0]?allData[0][1].value:''}}
      tr
        td 涨跌 
        td {{allData[1]?allData[1][0].value:''}}
        td 最高 
        td {{allData[1]?allData[1][1].value:''}}
      tr
        td 均价 
        td {{allData[2]?allData[2][0].value:''}}
        td 最低 
        td {{allData[2]?allData[2][1].value:''}}
      tr
        td 振幅 
        td {{allData[3]?allData[3][0].value:''}}
        td 昨收 
        td {{allData[3]?allData[3][1].value:''}}


 
</template>

<style lang="less"> 
  
</style>

<script lang="babel">
  var Q = require('q')
  import HqTable from '../models/info.model.js' 
  import DataLoader from '../models/data.model.js' 
  import Config from '../services/config.service.js'
  export default {
    data : ()=>{
      return {
        allData:[],
        price:'',
        name:'',
        daydata:'',
        sid:Config.sids,
        activesid:0
      }
    },
    props:['chartsopt'],
    computed:{
    },
    methods:{
      genTable:function(){
        var _this = this
        
        this.table = new HqTable(this.$el,
          'sid='+this.sid.join(',').replace(/\+/g,'%2B'),
          new DataLoader(),
          this.activesid,
          this)
        this.table.loadData(function(){
          _this.initData(_this,_this.table);
        })
        
      },
      getActiveSidIndex:function(sid){
        var _this = this,tmpindex = 0;
        if(!sid || (!_this.sid)){
          console.log('err:',sid,_this.sid);
          return 0;
        }
        _this.sid.forEach((item,index)=>{
          if(item == sid){
            tmpindex = index;
          }
        });
        return tmpindex
      },
      initData:function(dest,src){
        dest.price = src.price
        dest.allData = src.allData
        dest.name = src.name
        dest.daydata = src.daydata
      }
    },
    events: {
      reload:function(){
        this.activesid = this.getActiveSidIndex(this.$parent.chartsopt[0].sid);
        this.genTable();
      },
      changeSid:function(opt){ 
        this.activesid = this.getActiveSidIndex(opt.sid);
        console.log(97,opt.sid,this.activesid);
        this.genTable();
      }
    },
    ready:function(){
     var _this = this
     this.activesid = this.getActiveSidIndex(this.$parent.chartsopt[0].sid);
     this.genTable()
     setInterval(function(){
      _this.genTable();
     },60000)
    },
    components: {
    }
  }
</script>
