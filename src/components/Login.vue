<template>
  <div class="login-box">
    <div class="avtor">
      <img src="../assets/logo.png" alt />
    </div>
    <el-form ref='loginFormRef' :model="form" :rules='loginFormRules' class="from">
      <el-form-item label prop='username'>
        <el-input v-model='form.username' prefix-icon='iconfont icon-supplier-features'></el-input>
      </el-form-item>
      <el-form-item label prop='password'>
        <el-input type='password' v-model='form.password' prefix-icon='iconfont icon-RectangleCopy1'></el-input>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type='primary' @click='validate'>登录</el-button>
        <el-button type='info' @click='resetForm'>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import '../utils/mock'
export default {
    data(){
        return {
            form:{
                username: '123',
                password: '123',
            },
            //表单验证
            loginFormRules:{
                //验证用户名
                username:[
                    {required: true, message: '请输入登录名称', trigger: 'blur'},
                    {required: true, min:3, max:6, message: '长度3-6个汉字', trigger: 'blur'},
                ],
                //验证密码
                password: [
                    {required: true, message: '请输入登录密码', trigger: 'blur'},
                    {required: true, min:6, max:16, message: '长度6-16个字符', trigger: 'blur'},
                ]
            }
        }
    },
    methods:{
        resetForm(){
            this.$refs.loginFormRef.resetFields()
            // console.log($refs.loginFormRef)
        },
        validate(){
            this.$refs.loginFormRef.validate(async (v)=>{
                if(!v) return
                const res = await this.$http.post('/login', this.form)
                //登录验证
                if(res.data[0].username !=  this.form.username){
                  return this.$Message.error('登录失败')
                }else{
                  this.$Message.success('登录成功')
                  const { token } = res.data[0]
                  window.sessionStorage.setItem('token', token)
                  this.$router.push('/home')
                }
            })
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