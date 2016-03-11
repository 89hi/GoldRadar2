var Q = require('q')

import urls from '../config/servers.config.js'

var composeUrl = (path,type)=>{
  var url;
  path = path || ''
  if(type && type === 1){
    url = urls.hqUrl+path
  }else{
    url = urls.touCunUrl+path
  }
  return url
}  

export default {
  get:(path,param,type)=>{
    var deferred = Q.defer(),
    url = composeUrl(path,type)
    // param && (url += '?'+$.param(param))
    $.ajax({
      url:url,
      type:'GET',
      data:param,
      cache:false, 
      error:(XMLHttpRequest, textStatus, errorThrown)=>{
        deferred.reject('网络异常或服务器故障,错误码:'+XMLHttpRequest.status)
      },
      success:(result)=>{
        deferred.resolve(result)
      }
    })
    return deferred.promise
  },
  jsonp:(path,param,type)=>{
    var deferred = Q.defer(),
    url = composeUrl(path,type)
    param && (url += '?'+$.param(param))
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      cache:false, 
      error:(XMLHttpRequest, textStatus, errorThrown)=>{
        deferred.reject('网络异常或服务器故障,错误码:'+XMLHttpRequest.status)
      },
      success:(result)=>{
        deferred.resolve(result)
      }
    })
    return deferred.promise
  },
  post:(path,param,type)=>{
    var deferred = Q.defer(),
    url = composeUrl(path,type)
    $.ajax({
      url:url,
      type:'POST',
      cache:false,
      data:param,
      xhrFields: {
        withCredentials: true
      },
      error:(XMLHttpRequest, textStatus, errorThrown)=>{
        deferred.reject('网络异常或服务器故障,错误码:'+XMLHttpRequest.status)
      },
      success:(result)=>{
        deferred.resolve(result)
      }
    })
    return deferred.promise
  }
}