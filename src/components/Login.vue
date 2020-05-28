<template>
  <div class="login-box">
    <div class="avtor">
      <img src="../assets/logo.png" alt />
    </div>
    <el-form :model="form" class="from">
      <el-form-item label>
        <el-input v-model='form.username' prefix-icon='iconfont icon-supplier-features'></el-input>
      </el-form-item>
      <el-form-item label>
        <el-input type='password' v-model='form.password' prefix-icon='iconfont icon-RectangleCopy1'></el-input>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type='primary'>登录</el-button>
        <el-button type='info'>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
    data(){
        return {
            form:{
                username: '123',
                password: '123',
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.login-box {
  width: 400px;
  height: 250px;
  background-color: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 50%;
  margin-left: -200px;
  top: 50%;
  margin-top: -125px;
  border-radius: 6px;
  .from{ margin: 60px 30px;}
  .btn-box{text-align:right;}
  .avtor {
    position: absolute;
    left: 50%;
    top: -55px;
    margin-left: -55px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #fee;
    border: solid 1px #eee;
    img {
      width: 90%;
      height: 90%;
      margin: 5%;
      display: block;
      background-color: #ddd;
      border-radius: 50%;
    }
  }
}
</style>