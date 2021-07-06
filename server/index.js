const express = require('express');

const app = express();

app.set('secret', 'djalj5lajtah4');   // 设置全局变量

app.use(require('cors')());   // node 后端跨域处理
app.use(express.json());   // 解析请求中的 json
app.use('/uploads', express.static('uploads'));

require('./plugins/db')(app);   // 引入 db 并传 app 对象给它
require('./routes/admin')(app);   // 引入 admin 路由对象并传 app 对象给它

app.listen(3000, ()=>{
    console.log('listen to 3000');
})