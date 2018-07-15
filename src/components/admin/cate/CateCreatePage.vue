<template>
  <el-row>
    <el-col :span="12" :push="6">
      <CateCreate></CateCreate>
    </el-col>
  </el-row>
</template>

<script>
  import CateCreate from "./CateCreate";
  export default {
    name: "CateCreatePage",
    components: {CateCreate}
  }
</script>

<style scoped>

</style>
