

import $http from '../../common/services/http.service.js'

export default {
   timestamp:{},
   getPositionSummaries:function(data,callback,context){
      var _this = this,param = {}
      _this.timestamp.PositionSummaries = new Date().getTime()
      param.timestamp = _this.timestamp.PositionSummaries
      param.platform = 'web'
      param.param = JSON.stringify(data)
      $http.jsonp('monitor/positionSummaries',param)
      .then((res)=>{
        if(res.timestamp != _this.timestamp.PositionSummaries) return
        if(context){
          callback.call(context,res)
        }else{
          callback(res) 
        }
      })
   }
   ,parseLabel:function(value){
      var _this = this;
      var unitval = '';
      if(value > 100000000){
        value = value/100000000
        unitval = '亿'
      }else if(value > 10000){
        value = value/1000
        unitval = '万'
      }
      var val = value;
      if((val+'').indexOf('.') > 0){
        return Highcharts.numberFormat(val,1,'.',',')+unitval;
      }else{
        return Highcharts.numberFormat(val,0,'.',',')+unitval;
      }
    },
    fmoney(s, n){  
      n = n > 0 && n <= 20 ? n : 1;  
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";  
      var l = s.split("").reverse();  
      t = "";  
      for (i = 0; i < l.length; i++) {  
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
      }  
      return t.split("").reverse().join("");  
    }
}