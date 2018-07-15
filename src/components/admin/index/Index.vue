<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col>
          <h1>header</h1>
        </el-col>
      </el-row>
    </el-header>
    <el-aside>
      <el-menu
        :router="true"
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1" :active="true">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>文章管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/admin/cate/create">
              <i class="el-icon-circle-plus"></i>新分类</el-menu-item>
            <el-menu-item index="/">
              <i class="el-icon-tickets"></i>文章分类</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="文章">
            <el-menu-item index="/admin/articel_create">新文章</el-menu-item>
            <el-menu-item index="/admin/articel">文章列表</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "Index"
  }
</script>

<style scoped>
  .el-header{
    background: #545c64;
  }
  .el-aside {
    background: #545c64;
    position: fixed;
    top: 60px;
    bottom: 0;
    left: 0
  }

  .el-main {
    position: absolute;
    left: 300px;
    top: 60px;
    right: 0;
    bottom: 0;
  }
</style>
