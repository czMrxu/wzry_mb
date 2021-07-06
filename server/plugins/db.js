module.exports = app =>{
    const mongoose = require('mongoose');
    mongoose.set('useFindAndModify', false);   // 兼容废弃处理
    mongoose.connect('mongodb://127.0.0.1:27017/wzry-mb', {   // 连接 mongodb 中的数据库 wzry-mb
        useNewUrlParser: true,   // 兼容废弃处理
        useUnifiedTopology: true   // 兼容废弃处理
    })
}