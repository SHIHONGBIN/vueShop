<template>
     <!-- 面包靴导航/ -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">{{firstNav}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/'+ url }">{{secondNav}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{lastNav}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>


<script>
export default {
   props:{
      firstNav: String, 
      secondNav: String, 
      lastNav: String, 
      url: String, 
   }
}
</script>

<style lang="scope">
    
</style>