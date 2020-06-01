<template>
  <el-container>
    <el-header class="header-box">
      <div class="login">
        <img src="../assets/logo.png" alt />
        电商管理系统
      </div>
      <el-button type="info" @click="checkout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width='isHideNavObj?"64px":"200px"'>
        <div style="text-align:right; border:none;">
            <i :class="isHideNavObj?'el-icon-s-unfold':'el-icon-s-fold'" style="margin-right:10px;cursor:pointer"
            title="折叠" @click='isHideNav'></i>
        </div>
        <el-menu  style="backgroundColor:#000;"
         active-text-color="#ff5d73!important"
         :unique-opened='true'
         :collapse="isHideNavObj"
         :collapse-transition="false"
         :router="true"
         :default-active='path'
        >
          <el-submenu :index="item.id+''" :key='item.id' v-for="item in  menuList">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i><span slot="title">{{item.authName}}</span>
            </template>
              <el-menu-item :index="'/'+items.path" v-for="items in item.children" :key='items.id' @click='saveNavState("/"+items.path)'>
                <i class="el-icon-menu"></i>
                {{items.authName}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
    data(){
        return {
            //菜单
            menuList:'',
            iconsObj:{
                '101':'iconfont icon-supplier-features',
                '201':'iconfont icon-gift',
                '301':'iconfont icon-rmb',
                '401':'iconfont icon-add-cart',
                '501':'iconfont icon-all',
            },
            isHideNavObj:false,
            activeMenu:'',
            path:''
        }
    },
    created(){
        this.getMenuList()
        //高亮nav
        this.getNavActive()
    },
  methods: {
    checkout() {
      window.sessionStorage.removeItem("token");
      this.$Message.success("退出成功");
      this.$router.push("/login");
    },
    //获取nav
    async getMenuList(){
        const { data } = await this.$http.get('nav')
        if(data.meta.status != 200) return this.$Message.error(data.meta.msg)
        this.menuList = data.data
    },
    //切换nav
    isHideNav(){
        this.isHideNavObj = !this.isHideNavObj
    },
    //高亮nav
    saveNavState(path){
      window.sessionStorage.setItem('path', path)
      this.path = window.sessionStorage.getItem('path')
    },
    getNavActive(){
        this.path = window.sessionStorage.getItem('path')
    }
  }
};
</script>


<style lang="scss" scope>
.iconfont{font-size: 22px; margin-right: 10px;}
.header-box {
  background-color: #000;
  color: #fff;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .login {
    height: 100%;
    display: flex;
    align-items: center;
    img {
      height: 60%;
      width: auto;
      border-radius: 50%;
      border: solid 1px rgba(255, 255, 255, 0.5);
      margin-right: 10px;
      box-shadow: 1px 1px 5px rgba(0, 255, 0, 0.8);
    }
  }
}
.el-menu--popup{padding:0!important}
.el-submenu__title{color:#fff!important}
.el-submenu__title:hover{background-color: #333!important;}
.el-menu-item{background-color: #000!important;color:#fff!important}
.el-menu,.el-aside {
  background-color: #000;color:#fff; border:none!important;
}
.el-main {
  background-color: #eee;
}
.el-container {
  height: 100%;
}
</style>