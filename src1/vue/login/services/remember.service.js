

import storage from '../../common/services/storage.service.js'
import dateUtil from '../../common/services/date.service.js'

var dateformat = "yyyy-MM-dd" 

export default  {
    load:()=>{
      var user,curdate
      // user.username = storage.get('username')
      // user.password = storage.get('password')
      // user.ischeck = storage.get('ischeck')
      // user.dt = storage.get('date')
      user = storage.get('user')
      user = user || {}
      curdate = dateUtil.format(new Date(),dateformat);
      if(user.dt && curdate != user.dt){
        storage.remove('date');
        user.password = '';
        user.dt = null;
      }
      console.log('user :',user)
      return user
    },
    save:(user)=>{
      if(!user) return
      storage.set('user',user)
      return user
    },
    forgot:(user)=>{
      if(!user) return
      storage.remove('user')
    },
    login:()=>{
      storage.set('login',true)
    },
    isLogin:()=>{
      return storage.get('login')
    }
}