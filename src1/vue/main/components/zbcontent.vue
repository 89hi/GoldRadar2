<template lang="jade">
aside.bottomtabs.swc-move-aside(@mouseenter="show($event)" @mouseleave="hide($event)")
  ul.tab-container
    li.tab(v-for="pz in zbs" v-bind:class="{active:pz.active}" @click="changeZb(pz)")
      .swc-full-container(style="position:absolute")
        .swc-table-container
          .swc-table-cell.tabtext
            |{{pz.text}}

div.topheader
  filter(v-bind:companyfilter.sync="charts[0].comfilter" id="filter" v-bind:companies.sync="charts[0].companies")
  zmd

section.swc-flex-row-container.content-container(v-bind:class="{min:minflg}" style="height:95%;bottom:0px")       
  echartcontainer(v-for="chart in charts"  v-bind:chartopt="chart" v-bind:minflg.sync="minflg")
  infocontainer(@mouseenter="show($event)" @mouseleave="hide($event)" v-bind:chartsopt="charts" style="height:100%")
</template>

<style lang="less">
  
</style>

<script lang="babel">   

  import EChartContainer from './chart.container.vue'
  import InfoContainer from './info.container.vue'
  import Config from '../services/config.service.js'
  import Zmd from './zmd.vue'
  import Filter from './filter.vue'
  import { alert } from 'vue-strap'


  export default {
    data : ()=>{ 
      var zbs = [
        {
          text:'持仓人数',
          measure:Config.measures[0],
          active:true,
          msg:Config.msgs[0],
        }
        ,{
          text:'持仓金额',
          measure:Config.measures[1],
          active:false,
          msg:Config.msgs[1]
        }
        ,{
          text:'持仓盈亏',
          measure:Config.measures[2],
          active:false,
          msg:Config.msgs[2]
        }
      ],charts = [{
        id:'fir',
        index:0,
        commodity:Config.commodity[2],
        msname:Config.pznames[0],
        companies:Config.companies,
        comfilter:Config.comfilter,
        cmpname:Config.cmpnames[0]+'+'+Config.cmpnames[1]+'+'+Config.cmpnames[2],
        startHour:'6',
        startMinute:'0',
        endHour:'4+',
        endMinute:'0',
        lidu:[true,true,true,true,true],
        sid:Config.sids[0],
        heads:Config.heads,
        head:Config.head,
        activesid:0
      },{
        id:'sec',
        index:1,
        commodity:Config.commodity[0],
        msname:Config.pznames[1],
        companies:Config.companies,
        comfilter:Config.comfilter,
        cmpname:Config.cmpnames[0]+'+'+Config.cmpnames[1]+'+'+Config.cmpnames[2],
        startHour:'20-',
        startMinute:'0',
        endHour:'15',
        endMinute:'30',
        heads:Config.heads,
        head:{
          0:Config.head['0'],
          1:[Config.head['1'][0]],
          2:Config.head['2']
        },
        lidu:[false,false,false,true,true],
        filter:[{
          startHour:'2',
          startMinute:'30',
          endHour:'9',
          endMinute:'0',
        },{
          startHour:'11',
          startMinute:'30',
          endHour:'14',
          endMinute:'0',
        }],
        sid:Config.sids[1],
      },{ 
        id:'three',
        index:2,
        commodity:Config.commodity[1],
        msname:Config.pznames[2],
        companies:Config.companies,
        comfilter:Config.comfilter,
        cmpname:Config.cmpnames[0]+'+'+Config.cmpnames[1]+'+'+Config.cmpnames[2],
        startHour:'20-',
        startMinute:'0',
        endHour:'15',
        endMinute:'30',
        heads:Config.heads,
        head:{
          0:Config.head['0'],
          1:[Config.head['1'][0]],
          2:Config.head['2']
        },
        lidu:[false,false,false,true,true],
        sid:Config.sids[2],
        filter:[{
                startHour:'2',
                startMinute:'30',
                endHour:'9',
                endMinute:'0',
              },{
                startHour:'11',
                startMinute:'30',
                endHour:'14',
                endMinute:'0',
        }]
      }],  
      curZb = zbs[0]
      charts.forEach((c)=>{

        c.measure = curZb.measure
        c.text = curZb.text
        c.msgs = c.msname+'-'+c.text+'|'+curZb.msg;
      })
      return {
        minflg:false,
        charts:charts
        ,zbs:zbs 
        ,curZb:curZb 
      }
    },

    methods:{
      show:function($event){
        this.$parent.show($event)
      }
      ,hide:function($event){
        this.$parent.hide($event)
      },changeZb:function(zb){
        var _this = this
        this.zbs.forEach(function(z){
          z.active = false
        })
        zb.active = true
        this.curZb = zb
        this.charts.forEach(function(c){
          c.measure = _this.curZb.measure
          c.text = _this.curZb.text
          c.msgs = c.msname+'-'+c.text+'|'+_this.curZb.msg;
        //  c.text = c.msname+'-'+c.text+'|'+this.curZb.msg;
        })
        this.$broadcast("reload")
      }
    },
    events: {
      'changefilter':function(companyname,companyfilter){
        this.curZb.companies = companyfilter;
        this.curZb.cmpname = companyname;

        this.charts.forEach((c)=>{
          c.companies = this.curZb.companies
          c.cmpname = this.curZb.cmpname
          //c.text = curZb.text
          //c.msgs = c.text+'-'+c.msname+'|'+c.msg;
        })
        this.$broadcast("reload")
      }
    },

    components: {
      "echartcontainer":EChartContainer,
      "infocontainer":InfoContainer,
      "zmd":Zmd,
      "filter":Filter
    }
  }
</script>
