<template>
  <el-card v-loading="loading">
    <template slot="header">
      编辑分类
    </template>
    <el-form :model="cate"
             :rules="rules"
             ref="ruleForm"
             label-position="right"
             label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="cate.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="update('ruleForm')">保存</el-button>
        <el-button type="success" @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {mapState} from 'vuex'
  import '@/static/test'

  export default {
    name: "CateEdit",
    props: {
      id: {
        'required': true
      }
    },
    data() {
        return {
        }
    },
    computed: {
      ...mapState({
        cate: state => state.cate.cate,
        rules: state => state.cate.rules,
        loading: state => state.cate.loading
      })
    },
    methods: {
      back() {
        this.$router.back();
      },
      update(form) {
        let vthis = this;

        this.$refs[form].validate((validate) => {
          if (!validate) {
              return;
          }
          this.$store.dispatch('cate/update', this.cate).then(res => {
            vthis.$confirm('是否关闭页面?')
              .then(_ => {
                vthis.$store.commit('cate/resetCate');
                vthis.$router.back();
              });
          })
            .catch(res =>{
              console.log(res);
            });
        });

      }
    },
    created() {
      this.$store.dispatch('cate/show', {id: this.id});
    }
  }
</script>

<style scoped>

</style>
