<template>
    <div>
      <BreadCrumbs firstNav='首页' secondNav='权限管理' lastNav='角色列表' url='rols'></BreadCrumbs>
      <el-card>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div>
                5555555552222
            </div>
          </div>
        </el-col>
      </el-row>
      </el-card>
    </div>
</template>


<script>
import BreadMenu from './../common/BreadMenu'
export default {
    data(){
        return {
            msg:1
        }
    },
    methods:{

    },
    components:{
      BreadCrumbs:BreadMenu,
      // Titles:Title,
    },
}
</script>

<style lang="scope">
    
</style>