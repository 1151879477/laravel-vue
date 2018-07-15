<template>
  <div>
    <el-row>
      <el-col>
        <el-card>
          <template slot="header">
            基本信息
          </template>
          <el-form label-width="100px" label-position="right" :model="basicInfo">
            <el-form-item label="控制器名称">
              <el-input v-model="basicInfo.controller_name"></el-input>
            </el-form-item>
            <el-form-item label="模型名称">
              <el-input v-model="basicInfo.model_name"></el-input>
            </el-form-item>
            <el-form-item label="视图名称">
              <el-input v-model="basicInfo.view_name"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px;">
      <el-col>
        <el-card style="margin-bottom: 50px">
          <template slot="header">
            <span>字段</span>
            <div style="float: right">
              <el-button type="success" @click="gen('/saveTableData')">生成</el-button>
            </div>
          </template>
          <el-table :data="fields">
            <el-table-column prop="name" label="名"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="type" label="输入类型">
              <template slot-scope="scope">
                <el-select v-model="scope.row.show_type" filterable>
                  <el-option label="integer" value="integer"></el-option>
                  <el-option label="string" value="string"></el-option>
                  <el-option label="datetime" value="datetime"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="lable">
              <template slot-scope="scope">
                <el-input v-model="scope.row.lable"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="搜索">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.search"
                  :active-value="1"
                  :inactive-value="0"
                ></el-switch>
              </template>
            </el-table-column>

            <el-table-column label="列表">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.index"
                           :active-value="1"
                           :inactive-value="0"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="新建">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.create"
                           :active-value="1"
                           :inactive-value="0"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="编辑">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.show"
                           :active-value="1"
                           :inactive-value="0"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="默认值">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-setting" circle></el-button>
              </template>
            </el-table-column>
            <el-table-column label="验证规则">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-question" circle></el-button>
              </template>
            </el-table-column>
            <el-table-column label="是否关联模型">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.is_ref"
                  :active-value="1"
                  :inactive-value="0"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="关联类型">
              <template slot-scope="scope">
                <el-select v-model="scope.row.ref_type" filterable>
                  <el-option label="无" value=""></el-option>
                  <el-option label="belongsTo" value="belongsTo"></el-option>
                  <el-option label="hasMany" value="hasMany"></el-option>
                  <el-option label="belongsToMany" value="belongsToMany"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="关联模型">
              <template slot-scope="scope">
                <el-input v-model="scope.row.ref_class"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="关联方法">
              <template slot-scope="scope">
                <el-input v-model="scope.row.ref_method"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import http from '@/lib/code/http'

  export default {
    name: "TableCard",
    props: {
      name: {
        required: true
      }
    },
    created() {
      this.$store.dispatch('tableCard/getTable', this.name)
    },
    computed: {
      ...mapState({
        basicInfo: state => state.tableCard.basicInfo,
        fields: state => state.tableCard.fields
      })
    },
    data() {
      return {}
    },
    methods: {
      gen(url) {

        let data = {};
        let vthis = this;
        data.basic_info = this.basicInfo;
        data.table_name = this.name;
        data.fields = this.fields;

        for (let i = 0; i < data.fields.length; ++i) {
          data.fields[i].field_rules = [
            {
              rule: 'required',
              message: '此项必须填写'
            },
            {
              rule: 'min:10',
              message: '最小为10'
            }
          ]
        }
        http.postData(url, data)
          .then(res => {
            let resData = res.data;
            if (resData.result.code == 1) {
              vthis.$notify.success(resData.result.message || '操作成功');
              if (resData.next) {
                vthis.gen(resData.next);
              }
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
