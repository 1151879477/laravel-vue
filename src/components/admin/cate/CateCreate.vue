<template>
  <el-card header="新建标题">
    <el-form :model="cate"
             :rules="rules"
             ref="ruleForm"
             label-position="right"
             label-width="80px"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="cate.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="cateCreate(cate)">创建</el-button>
        <el-button type="success" @click="backPage2">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {mapState} from 'vuex'
  import back from '@/mixin/back'

  export default {
    name: "CateCreate",
    mixins: [back],
    computed: {
      ...mapState({
        cate: state => state.cate.newCate,
        rules: state => state.cate.rules,
        loading: state => state.cate.loading,
      }),
    },
    methods: {
      cateCreate(cate) {
        let vthis = this;
        this.$refs['ruleForm'].validate(validate => {
          if (!validate) {
            return;
          }
          this.$store.dispatch('cate/create', cate).then((res) => {
            vthis.$confirm('是否关闭此页面').then(_ => {
              vthis.$router.go(-1);
            }).catch(_ => {
            });
          })
        });

      },
      backPage2() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>

</style>
