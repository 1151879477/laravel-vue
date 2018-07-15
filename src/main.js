// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  computed: {

  },
  beforeCreate(){
    if (!this.$store.state.is_login) {
      this.$router.push({name: 'Login'});
    }
  },
  created() {
    let vthis = this;
    this.$store.watch(state => state.isLogin, isLogin => {
      if (!isLogin) {
        this.$router.push({name: 'Login'});
        vthis.$message.error('您需要重新登录');
      }
    })
  }

});
