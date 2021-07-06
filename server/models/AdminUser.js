const mongoose = require('mongoose');

const schema = new mongoose.Schema({   // 设置分类表字段
    username: {type: String},
    password: {
        type: String,
        select: false,   // 设置非必要无法被客户端获取到
        set(val){
            return require('bcrypt').hashSync(val, 10);   // 加密规则
        }
    }
})

module.exports = mongoose.model('AdminUser', schema);