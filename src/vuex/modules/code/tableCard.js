import http from '@/lib/code/http'

export default {
  namespaced: true,
  state: {
    basicInfo: {},
    fields:[]
  },
  mutations: {
    setTable(state, list) {
      state.tableList = list;
    },
    setFields(state, list){
      state.fields = list;
    },
    setBasicInfo(state, info){
      state.basicInfo = info;
    }
  },
  actions: {
    getTable(context, table_name) {
      http.getData('/table/' + table_name).then(res => {
        context.commit('setFields', res.data.fields);
        context.commit('setBasicInfo', res.data.basic_info);
      });
    }
  },
}
