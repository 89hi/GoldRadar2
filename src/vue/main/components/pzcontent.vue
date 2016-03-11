<template lang="jade">
aside.bottomtabs.swc-move-aside(@mouseenter="show($event)" @mouseleave="hide($event)")
  ul.tab-container
    li.tab(v-for="pz in pzs" v-bind:class="{active:pz.active}" @click="changePz(pz)")
      .swc-full-container(style="position:absolute")
        .swc-table-container
          .swc-table-cell.tabtext
            |{{pz.text}}

div.topheader
  filter(v-bind:companyfilter.sync="curPz.comfilter" id="filter" v-bind:companies.sync="curPz.companies")
  zmd

section.swc-flex-row-container.content-container(v-bind:class="{min:minflg}" style="height:95%;bottom:0px")       
  echartcontainer(v-for="chart in charts"  v-bind:chartopt="chart" v-bind:minflg.sync="minflg")
  infocontainer(@mouseenter="show($event)" @mouseleave="hide($event)" v-bind:chartsopt="charts" style="height:100%")

alert(type="success")
  strong Well Done!
  p  You successfully read this important alert message.

modal(:show.sync='showCustomModal' effect='zoom' width='80%')
  div.modal-header(slot="modal-header")
    div.row
      div.col-lg-11
        div.input-group
          input.form-control(type='text' placeholder="在此输入交易账号，以分号间隔......" v-on:keyup.13="search()")
          span.input-group-btn
            button.btn.btn-primary(type='button' v-on:click='search()') Go!
  div.modal-body(slot="modal-body") 
   modaltable
   modaltable
   modaltable
  div.modal-footer(slot='modal-footer')
      button.btn.btn-default(type='button' @click='showCustomModal=false') Exit
</template>

<style lang="less">
  
</style>

<script lang="babel">   

  import storage from   '../../common/services/storage.service.js'
  import EChartContainer from './chart.container.vue'
  import Zmd from './zmd.vue'
  import Filter from './filter.vue'
  import InfoContainer from './info.container.vue'
  import Config from '../services/config.service.js'
  import { alert } from 'vue-strap' 
  import { modal } from 'vue-strap'
  import modaltable from './modaltable.vue'

  export default {
    data : ()=>{ 
      var pzs = [
        {
          text:'粤贵银',
          commodity:Config.commodity[2],
          companies:[Config.companies[0],Config.companies[1]],
          cmpname:Config.cmpnames[0]+'+'+Config.cmpnames[1],
          comfilter:[Config.comfilter[0]],
          startHour:'6',
          startMinute:'0',
          endHour:'4+',
          endMinute:'0',
          lidu:[true,true,true,true,true],
          sid:Config.sids[0],
          heads:Config.heads,
          head:Config.head,
          active:true
        }
        ,{
          text:'Ag(T+D)',
          commodity:Config.commodity[0],
          companies:[Config.companies[2]],
          cmpname:Config.cmpnames[2],
          comfilter:[Config.comfilter[1]],
          startHour:'20-',
          startMinute:'0',
          endHour:'15',
          endMinute:'30',
          lidu:[false,false,false,true,true],
          sid:Config.sids[1],
          active:false,
          heads:Config.heads,
          head:{
            0:Config.head['0'],
            1:[Config.head['1'][0]],
            2:Config.head['2']
          },
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
        }
        ,{
          text:'Au(T+D)',
          commodity:Config.commodity[1],
          companies:Config.companies,
          cmpname:Config.cmpnames[2],
          comfilter:[Config.comfilter[1]],
          startHour:'20-',
          startMinute:'0',
          endHour:'15',
          endMinute:'30',
          lidu:[false,false,false,true,true],
          sid:Config.sids[2],
          heads:Config.heads,
          head:{
            0:Config.head['0'],
            1:[Config.head['1'][0]],
            2:Config.head['2']
          },
          active:false,
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
             
        }
      ],charts =  [{
        id:'fir1',
        index:0,
        measure:Config.measures[0],
        msname:Config.msnames[0],
        msg:Config.msgs[0]
      },{
        id:'sec1',
        index:1,
        measure:Config.measures[1],
        msname:Config.msnames[1],
        msg:Config.msgs[1]
      },{ 
        id:'three1',
        index:2,
        measure:Config.measures[2],
        msname:Config.msnames[2],
        msg:Config.msgs[2]
      }],
      curPz = pzs[0]
      charts.forEach((c)=>{
        c.startHour = curPz.startHour
        c.startHour = curPz.startHour
        c.endHour = curPz.endHour
        c.endMinute = curPz.endMinute
        c.endHour = curPz.endHour
        c.endMinute = curPz.endMinute
        c.commodity = curPz.commodity
        c.companies = curPz.companies
        c.filter = curPz.filter
        c.heads = curPz.heads
        c.head = curPz.head
        c.lidu = curPz.lidu
        c.sid = curPz.sid
        c.cmpname = curPz.cmpname
        c.text = curPz.text
        c.msgs = c.text+'-'+c.msname+'|'+c.msg;
       // console.log('hehehda1 :',c.filter);
      })
      return {
        minflg:false,
        charts:charts,
        pzs:pzs,
        curPz:curPz,
        showRight:false,
        showCustomModal:false
      }
    },

    methods:{
      show:function($event){
        this.$parent.show($event)
      }
      ,hide:function($event){
        this.$parent.hide($event)
      }
      ,changePz:function(pz){
        var _this = this
        console.log('pz:',pz);
        this.pzs.forEach(function(p){
          p.active = false
        })
        pz.active = true
        this.curPz = pz
        this.charts.forEach(function(c){
          c.startHour = _this.curPz.startHour
          c.startHour = _this.curPz.startHour
          c.endHour = _this.curPz.endHour
          c.endMinute = _this.curPz.endMinute
          c.commodity = _this.curPz.commodity
          c.companies = _this.curPz.companies
          c.lidu = _this.curPz.lidu
          c.heads = _this.curPz.heads
          c.head = _this.curPz.head
          c.sid = _this.curPz.sid
          c.cmpname = _this.curPz.cmpname
          c.text = _this.curPz.text
          c.msgs = c.text+'-'+c.msname+'|'+c.msg;
          c.filter = _this.curPz.filter
        //  console.log('hehehda2 :',c.companies,c.lidu);
        })
        this.$broadcast("reload")

      },
      search:function(event){
        this.$broadcast("searchCustomer")
      }
    },
    ready:function(){
    },
    events: {
      'changefilter':function(companyname,companyfilter){
        this.curPz.companies = companyfilter;
        this.curPz.cmpname = companyname;

        this.charts.forEach((c)=>{
          c.companies = this.curPz.companies
          c.cmpname = this.curPz.cmpname
          //c.text = curPz.text
          //c.msgs = c.text+'-'+c.msname+'|'+c.msg;
        })
        this.$broadcast("reload")
      },
      'boardAlert':function(obj){
        this.$set('showCustomModal',obj.showModal)
      }
    },
    components: {
      "echartcontainer":EChartContainer,
      "infocontainer":InfoContainer,
      "zmd":Zmd,
      "filter":Filter,
      "alert":alert,
      "modal":modal,
      "modaltable":modaltable
    }
  }
</script>
