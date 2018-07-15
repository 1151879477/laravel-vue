import http from '@/lib/code/http'

export default {
  namespaced: true,
  state: {
    tableList: []
  },
  mutations: {
    setTableList(state, list) {
      state.tableList = list;
    }
  },
  actions: {
    getTableList(context, data) {
      http.getData('/table').then(res => {
        context.commit('setTableList', res.data.list);
      });
    }
  },
}
