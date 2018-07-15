<template>
  <el-row>
    <el-col>
      <el-row>
        <el-col>

          <el-card shadow="never" :body-style="{padding:0}">
            <template slot="header">
              所有分类列表
            </template>
            <el-table
              :border="true"
              :data="cateList"
              size="medium"
              v-loading="loading"
              element-loading-text="玩命加载中..."
            >
              <el-table-column prop="id" label="ID"></el-table-column>
              <el-table-column prop="name" label="名称"></el-table-column>
              <el-table-column prop="created_at" label="创建日期"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" icon="el-icon-search" @click="show(scope.row)"></el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete" @click="destory(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="9">
          <el-pagination
            @current-change="setpage"
            layout="prev, pager, next"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :total="page.total">
          </el-pagination>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "Cate",
    created() {
      this.$store.dispatch('cate/getList');
      let vthis = this;
    },
    computed: {
      ...mapState({
        cateList: state => state.cate.list,
        page: state => state.cate.page,
        loading: state => state.cate.loading
      })
    },
    data() {
      return {}
    },
    methods: {
      ...mapActions({
        destory: 'cate/destory'
      }),
      setpage(pageNow) {
        let page = this.page;
        page.currentPage = pageNow;
        this.$store.dispatch('cate/getList', page)
      },
      show(row) {
        this.$router.push({
          name: 'CateEdit',
          params: {
            id: row.id
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
