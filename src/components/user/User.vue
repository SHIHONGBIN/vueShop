<template>
  <div>
    <!-- 面包靴导航/ -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div>
              <el-input placeholder="请输入内容" v-model="input3" class="input-with-select"
                :clearable='true'
                @clear='getUserList'
              >
                <el-button slot="append" icon="el-icon-search" @click='searchUsers'></el-button>
              </el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click='addUers'>添加用户</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="userlist" stripe border style="width: 100%; marginTop:15px; fontSize:12px">
        <el-table-column label="#" align="center" type="index" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="type" label="角色"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"
            @change='switchChange(scope.row)'
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" width="200">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑" placement="top-start" :enterable="false">
              <el-button @click="handleClick(scope.row)" type="primary" size="mini">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top-start" :enterable="false">
              <el-button  @click='deleteBox'  type="danger" size="mini">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="配置权限" placement="top-start" :enterable="false">
              <el-button type="warning" size="mini">
                <i class="el-icon-setting"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 3, 5, 10 ]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>


    <el-dialog
  title="提示"
  :visible.sync="addUserDialog"
  width="50%"
  @close="handleClose">
  <el-form :model="userForm" :rules="userFormRuls" ref="userForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="name">
    <el-input v-model="userForm.name"></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="password">
    <el-input v-model="userForm.password" show-password></el-input>
  </el-form-item>
    <el-form-item label="手机" prop="phone">
    <el-input v-model="userForm.phone"></el-input>
  </el-form-item>
    <el-form-item label="邮箱" prop="email">
    <el-input v-model="userForm.email"></el-input>
  </el-form-item>
   
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="dialogVisible">确 定</el-button>
  </span>
</el-dialog>

    <el-dialog
  title="修改用户信息"
  :visible.sync="editUserDialog"
  width="50%"
  @close="handleEditClose">
  <el-form :model="editForm" :rules="userFormRuls" ref="userFormEdit" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名">
    <el-input disabled v-model="editForm.name"></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop="email">
    <el-input v-model="editForm.email"></el-input>
  </el-form-item>
    <el-form-item label="手机" prop="phone">
    <el-input v-model="editForm.phone"></el-input>
  </el-form-item>
   
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editUserDialog=false">取 消</el-button>
    <el-button type="primary" @click="validateEditForm">确 定</el-button>
  </span>
</el-dialog>
  </div>
  
</template>

<script>
export default {
  data() {
    var validateEmail = (rule, value, callback)=>{
      const regf = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

 if(regf.test(value)){
        return callback()
      }

       callback(new Error('请输入合法邮箱！'))
      
     
    }

    var validatePhone = (rule, value, callback)=>{
      const regf = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

 if(regf.test(value)){
        return callback()
      }

       callback(new Error('请输入正确手机号！'))
      
     
    }
    return {
      input3: "",
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      total: 0,
      addUserDialog:false,
      editUserDialog:false,
      editForm:{
  name:'',
        phone:'',
        email:''
      },
      userFormRuls:{
        name:[
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
         phone:[
           { required: true, message: '手机号必填', trigger: 'blur' },
            {validator:validatePhone, required:true, trigger: 'blur' }
        ],
        email:[
          { required: true, message: '邮箱必填', trigger: 'blur' },
          {validator:validateEmail, trigger: 'blur' }
        ],
         password:[
          { required: true, message: '密码必填', trigger: 'blur' },
           { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      userForm:{
        name:'123456',
        phone:'15458545555',
        email:'dsadas@qq.com',
        password:'123456789'
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data } = await this.$http.get("userlist");
      if (data.meta.status != 200) return this.$Message.error(data.meta.msg);
      // this.$Message.success(data.meta.msg);
      //获取所有数据 截取当前需要数据 正式环境传参数到后台 后台来截取
      this.userlist = data.data.userlist.slice((this.queryInfo.pagenum-1)*this.queryInfo.pagesize, this.queryInfo.pagenum*this.queryInfo.pagesize );
      this.total = data.data.userlist.length;
      // console.log(this.total)
    },
    handleSizeChange(size){
      //切换每页的展示数据的长度
      this.queryInfo.pagesize = size
      this.getUserList()
    },
    handleCurrentChange(size){
      //切换当前第几页
      // console.log(size)
      this.queryInfo.pagenum = size
      this.getUserList()
    },
    async switchChange(e){
      const res = await this.$http.put(`edit`,{
        id:e.id
      })
      if(res.data.meta.status == 200 ) return this.$Message.success(res.data.meta.msg)
    },
    //查询用户
    searchUsers(){
      if(this.input3.trim() == ''){
        this.getUserList()
      }else{
        console.log(1)
this.userlist = this.userlist.filter((item)=>item.name.indexOf(this.input3)>0)
      }
      
    },
    //添加用户
    addUers(){
      this.addUserDialog = true
    },
     dialogVisible(e){
      this.$refs.userForm.validate(async valid => {
        if(!valid) return 
 //添加http请求
   this.addUserDialog = false
      this.resetForm()
      const {data:res} = await this.$http.post('addUser', {
        ...this.userForm
      })
      if(res.meta.status != 200) return this.$Message.error(res.meta.msg)
      this.$Message.success(res.meta.msg)
      this.userlist = res.data.userlist.slice((this.queryInfo.pagenum-1)*this.queryInfo.pagesize, this.queryInfo.pagenum*this.queryInfo.pagesize );
      this.total = res.data.userlist.length;
      })  
    },
    handleClose(){
       this.addUserDialog = false
       this.resetForm()
    },
    //重置表单
    resetForm(){
      this.$refs['userForm'].resetFields()
    },
    //编辑
    async handleClick(obj){
      this.editUserDialog = true
      const id = obj.id
      const { data:res } = await this.$http.get('editUser', {
        id: id
      })
      if(res.meta.status != 200 ) return this.$Message.error('查询失败！')

      this.editForm = res.data.userlist[0]

    },
    //编辑提交
    validateEditForm(){
      this.$refs.userFormEdit.validate(async valid=>{
        if(!valid) return
        const { data:res } = await this.$http.post('submitEditUser',this.editForm)
        console.log(res)
        if(res.meta.status != 200) return this.$Message.error('提交失败')
        this.$Message.success('提交成功')
        this.editUserDialog=false;
      })
    },
    //重置验证
    handleEditClose(){
      this.$refs.userFormEdit.resetFields()   
    },
    //删除框
    deleteBox(){
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$Message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$Message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  }
};
</script>


<style lang="scss" scope>
</style>