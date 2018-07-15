import http from '@/lib/http'
import {Message} from 'element-ui'
import store from '@/vuex'
import axios from 'axios'

export default {
  getData(url, data) {

    axios.defaults.headers.common['Authorization'] =
      store.state.admin.token_type + ' ' + store.state.admin.access_token

    return new Promise((resolve, reject) => {
      http.getData(url, data).then(resolve).catch(res => {
        if (res.response.status == 500) {
          Message.error('获取数据失败! ')
        } else if (res.response.status == 401) {
          store.commit('setLogin', false);
          return;
        } else {
          Message.error(res.data.result.message || '获取数据失败! ')
        }
      })
    })
  },
  postData(url, data) {
    return new Promise((resolve, reject) => {
      http.postData(url, data).then(res => {
        Message.success('操作成功');
        resolve(res.data)
      }).catch(res => {
        if (res.response.status == 500) {
          Message.error('提交数据失败! ')
        } else if (res.response.status == 401) {
          store.commit('setLogin', false);
        } else {
          Message.error(res.data.result.message || '获取数据失败! ')
        }
        reject(res);
      })
    })
  },
  putData(url, data) {
    return new Promise((resolve, reject) => {
      http.putData(url, data).then(res => {
        Message.success('操作成功');
        resolve(res.data)
      }).catch((res) => {
        if (res.response.status == 500) {
          Message.error('提交数据失败! ')
        } else if (res.response.status == 401) {
          store.commit('setLogin', false);
        } else if (res.response.status == 403) {
          Message.error(res.response.data.message || '抱歉，您没有权限')
        } else if (res.response.status == 422) {
          Message.error(res.response.data.message || '抱歉，数据验证未通过')
        } else {
          console.log(res.response);
        }
        reject(res.response);
      })
    })
  },
  deleteData(url, data) {
    return new Promise((resolve, reject) => {
      http.deleteData(url, data).then(res => {
        Message.success('操作成功');
        resolve(res.data)
      }).catch(res => {
        if (res.response.status == 500) {
          Message.error('删除失败! ')
        } else if (res.response.status == 401) {
          store.commit('setLogin', false);
          return;
        } else {
          Message.error(res.data.result.message || '删除失败! ')
        }
        reject(res);
      })
    })
  }
}
