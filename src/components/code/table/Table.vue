<template>
  <el-card>
    <template slot="header">
      所有数据表
    </template>

    <el-table :data="tableList">
      <el-table-column prop="Tables_in_gen" label="名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="showTable(scope.row)">生成</el-button>
          <el-button type="danger">闭包表</el-button>
        </template>
      </el-table-column>

    </el-table>
  </el-card>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "Table",
    computed: {
      ...mapState({
        tableList: state => state.table.tableList
      })
    },
    data(){
      return {

      }
    },
    created (){
      this.$store.dispatch('table/getTableList')
    },
    methods: {
      showTable (row){
          console.log(row);
          this.$router.push({name:'TableCard', params:{name: row.Tables_in_gen}})
      }
    }

  }
</script>

<style scoped>

</style>
