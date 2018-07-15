import Vue from 'vue'
import Vuex from 'vuex'
//import hook
import cate from './modules/admin/cate'
import index from './modules/admin/index'
import table from './modules/code/table'
import tableCard from './modules/code/tableCard'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin:false,
  },
  mutations: {
    setLogin (state, isLogin){
      state.isLogin = isLogin;
    }
  },
  action: {

  },
  modules: {
    cate,
    index,
    table,
    tableCard,
    admin:{
      state:{
        token_type:'Bearer',
        expires_in:'',
        access_token:'',
        refresh_token:''
      },
      mutations:{
        setToken (state, data){
          state.token_type = data.token_type;
          state.expires_in = data.expires_in;
          state.access_token = data.access_token;
          state.refresh_token = data.refresh_token;
        }
      }
    }
  },
  getters: {
    getLoginStatus : state => state.isLogin
  },

});
