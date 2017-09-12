import OAuth from 'oauth'

import AxiosInterceptor from 'src/interceptors/axios'
import RouterInterceptor from 'src/interceptors/v-router'

export default 
{
  install(Vue, options){
    //In this way we'll expose our class in all Vue components
    Vue.prototype.$oauth = new OAuth();

    Vue.mixin({
      mounted(){
        console.log("Bootstrapping")
      }
    })
  }
}