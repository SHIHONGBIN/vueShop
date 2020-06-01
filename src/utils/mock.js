import Mock from 'mockjs';

let data2 = [] // 用于接受生成数

    data2.push({
        username: '123456',
        password: '123456',
        token:'8dsad123a465d13sa13d2asda'
    })

    //登录
Mock.mock('http://localhost:8081/login', 'post', data2) 
//左侧菜单
let nav = {
    "data":[{
        "id":101,
        "authName":'用户管理',
        "path":'null',
        "children":[{
            "id":102,
            "authName":'用户列表',
            "path":'user',
            "children":[]
        }],
    },{
        "id":201,
        "authName":'权限管理',
        "path":null,
        "children":[{
            "id":202,
            "authName":'角色列表',
            "path":'rols',
            "children":[]
        },{
            "id":203,
            "authName":'权限列表',
            "path":'rights',
            "children":[]
        }], 
    },{
        "id":301,
        "authName":'商品管理',
        "path":null,
        "children":[{
            "id":302,
            "authName":'商品列表',
            "path":'goodsList',
            "children":[]
        },{
            "id":303,
            "authName":'分类参数',
            "path":'typeParams',
            "children":[]
        },{
            "id":304,
            "authName":'商品分类',
            "path":'goodsType',
            "children":[]
        }], 
    },{
        "id":401,
        "authName":'订单管理',
        "path":null,
        "children":[{
            "id":404,
            "authName":'订单列表',
            "path":'orderList',
            "children":[]
        }], 
    },{
        "id":501,
        "authName":'数据统计',
        "path":null,
        "children":[{
            "id":504,
            "authName":'数据列表',
            "path":'dataList',
            "children":[]
        }], 
    }],
    "meta":{
        "msg":"获取菜单列表成功",
        "status":200
    }
}
Mock.mock('http://localhost:8081/nav', 'get', nav) 
//用户列表
let userlist = {
    "data":{
        "userlist":[{
            "id":'1',
            "name":'张三',
            "email":'dsadas@!dsa.com',
            "phone":'15475485856',
            "type":'超级管理员',
            "status":true,
            "action":'',
        },{
            "id":'2',
            "name":'张三s',
            "email":'dsadas@!dsa.com',
            "phone":'15475485856',
            "type":'超级管理员',
            "status":true,
            "action":'',
        },{
            "id":'3',
            "name":'张三w',
            "email":'dsadas@!dsa.com',
            "phone":'15475485856',
            "type":'超级管理员',
            "status":false,
            "action":'',
        }],
        "total":20
    },
    "meta":{
        "msg":"获取用户列表成功",
        "status":200
    }
}


Mock.mock('http://localhost:8081/userlist', 'get', userlist) 

//修改用户列表状态
const userdata = {
    data:{

    },
    "meta":{
        "msg":"更新状态成功",
        "status":200
    }
}
Mock.mock('http://localhost:8081/edit', 'put', userdata)

//添加用户
//修改用户列表状态
const newData = {
    ...userlist,
    "data":{
        "userlist":[{
            "id":'1',
            "name":'张三',
            "email":'dsadas@!dsa.com',
            "phone":'15475485856',
            "type":'超级管理员',
            "status":true,
            "action":'',
        },{
            "id":'2',
            "name":'张三s',
            "email":'dsadas@!dsa.com',
            "phone":'15475485856',
            "type":'超级管理员',
            "status":true,
            "action":'',
        },{
            "id":'3',
            "name":'张三w',
            "email":'dsadas@!dsa.com',
            "phone":'15475485856',
            "type":'超级管理员',
            "status":false,
            "action":'',
        },
        {
            "id":'4',
            "name":'123456',
            "email":'dsadas@!dsa.com',
            "phone":'15475485856',
            "type":'超级管理员',
            "status":false,
            "action":'',
        }],
        "total":20
    },
    "meta":{
        "msg":"添加用户信息成功",
        "status":200
    }
}
Mock.mock('http://localhost:8081/addUser', 'post', newData)


let editUser = userlist.data.userlist.filter((item)=>item.id == 1 )

Mock.mock('http://localhost:8081/editUser', 'get', {
    "data":{
        "userlist":[...editUser]
    },  
    "meta":{
        "msg":"编辑用户信息",
        "status":200
    }
})



Mock.mock('http://localhost:8081/submitEditUser', 'post', {
   ...userlist,
    "meta":{
        "msg":"编辑用户信息",
        "status":200
    }
})