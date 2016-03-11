var storage = window.localStorage
,service = {
  get : (key)=>{
    if(!key) return null
    var ret = storage.getItem(key)
    if(ret){
      ret =  JSON.parse(ret)
    }
    return ret
  },
  set : (key,value)=>{
    if(!key) return null
    storage.setItem(key,JSON.stringify(value))
    return value
  },
  remove : (key)=>{
    if(!key) return null
    storage.removeItem(key)
  }
}


export default service



