

import $http from '../../common/services/http.service.js'


class DataLoader{
  constructor(){
    this.timestamp = {}
  }
  getPositionSummaries(data){
    var _this = this,param = {}
    _this.timestamp.PositionSummaries = new Date().getTime()
    param.timestamp = _this.timestamp.PositionSummaries
    param.platform = 'GR_MONITOR'
    param.param = JSON.stringify(data)
    
    // console.log('getPositionSummaries param:',param)
    return $http.jsonp('monitor/positionSummaries',param)
    .then((res)=>{
      if(res.timestamp != _this.timestamp.PositionSummaries) return
      return res
    })
  }
  getMkData(data,callback,context){  //获取k线数据
    var _this = this
    data || (data = {})
    data.timestamp = _this.timestamp.mkData
    return $http.get('hq/mkdata.do',data,1) 
  }
  getDkData(data,callback,context){  //获取日k线数据
    var _this = this
    data || (data = {})
    data.timestamp = _this.timestamp.mkData
    return $http.get('hq/dkdata.do',data,1) 
  }
  getOptData(data,callback,context){ //获取右上角实时数据
    var _this = this 
    return $http.get('hq/optdata.do?'+data,{},1) 
  }
  getTableData(data){
    var _this = this,param = {}
    _this.timestamp.tabledata = new Date().getTime()
    param.timestamp = _this.timestamp.tabledata
    param.platform = 'web'
    param.param = JSON.stringify(data)
    return $http.jsonp('monitor/priceDistributions',param)
    .then((res)=>{
      if(res.timestamp != _this.timestamp.tabledata) return

      return res
    })
  }
  getProfitLossData(data){
    var _this = this,param = {}
  }
}




export default DataLoader