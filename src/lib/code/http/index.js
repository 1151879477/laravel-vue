import httpConfig from './config'
import axios from 'axios'

export default {
  axios() {
    return axios.create(httpConfig);
  },

  getData(url, data) {
    return this.axios().get(url, {params:data})
  },
  postData(url,data){
    return this.axios().post(url,data);
  },
  putData(url,data){
    return this.axios().put(url,data);
  },
  deleteData(url,data){
    return this.axios().delete(url,data);
  }
}
