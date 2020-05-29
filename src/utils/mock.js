import Mock from 'mockjs';

let data2 = [] // 用于接受生成数

    data2.push({
        username: '123456',
        password: '123456',
        token:'8dsad123a465d13sa13d2asda'
    })
  
Mock.mock('http://localhost:8081/login', 'post', data2) 