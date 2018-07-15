import http from '@/lib/admin/http'
import {Message, MessageBox} from 'element-ui'

export default {
  namespaced: true,
  state: {
    url: '/admin/cate',
    createUrl: '/admin/cate',
    list: [],
    newCate: {},
    cate: {},
    loading: false,
    page: {
      total: 0,
      pageSize: 8,
      currentPage: 1,
    },
    search: {
      page: 1
    },
    ruleForm:{},
    rules: {
      name: [
        {required: true, message: '请输入分类名称', trigger: 'blur'},
        {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
      ],
    }
  },
  mutations: {
    setList(state, data) {
      state.list = data;
      state.loading = false;
    },
    setPage(state, page) {
      state.page = page;
      state.search.page = state.page.currentPage;
    },
    loading(state) {
      state.loading = true;
    },
    closeLoading(state) {
      state.loading = false;
    },
    resetCreate(state) {
      state.newCate = {};
    },
    setCate(state, cate) {
      state.cate = cate;
    },
    resetCate(state) {
      state.cate = {}
    }
  },
  actions: {
    /**
     * 获取列表
     * @param context
     * @param page
     */
    getList(context, page) {
      //传入分页
      return new Promise((succes, faild) => {

        context.commit('loading');
        if (page) {
          context.commit('setPage', page);
        }
        //遮罩
        context.commit('loading');

        //获取数据
        http.getData(context.state.url, context.state.search).then(res => {
          //赋值
          context.commit('setList', res.data.list.data);

          let page = {
            'pageSize': res.data.list.per_page,
            'total': res.data.list.total,
            'currentPage': res.data.list.current_page,
          };

          //分页赋值
          context.commit('setPage', page);

          succes();
        }).catch(faild)
      });


    },

    create(context, cate) {
      return new Promise((success, faild) => {
        http.postData(context.state.createUrl, cate).then(res => {
          context.commit('resetCreate');
          success(res);
        }).catch(faild)
      })

    },
    /**
     * 获取详情
     * @param context
     * @param cate
     * @returns {Promise<any>}
     */
    show(context, cate) {
      return new Promise((success, faild) => {
        context.commit('loading');
        context.commit('resetCate');

        http.getData(context.state.url + '/' + cate.id, cate)
          .then(res => {
            context.commit('closeLoading');
            console.log(context.state.loading);
            context.commit('setCate', res.data.data);
            success(res.data)
          })
          .catch(res => {
            context.commit('closeLoading');
            faild()
          });
      })
    },

    /**
     * 更新
     * @param context
     * @param cate
     * @returns {Promise<any>}
     */
    update(context, cate) {
      return new Promise((success, faild) => {
        http.putData(context.state.url + '/' + cate.id, cate)
          .then(res => {
            success(res.data)
          }).catch(faild)
        ;
      })
    },
    destory(context, cate) {
      MessageBox.confirm('确定要删除此数据？')
        .then(_ => {
          context.commit('loading');
          http.deleteData(context.state.url + '/' + cate.id).then(res => {
            context.dispatch('getList');
          })
        })
        .catch(_ => {
          Message.error('未进行操作');
        });
    }
  },
  getters: {}
}
