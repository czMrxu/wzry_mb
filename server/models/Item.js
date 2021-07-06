const mongoose = require('mongoose');

const schema = new mongoose.Schema({   // 设置分类表字段
    name: {type: String},
    icon: {type: String},
})

module.exports = mongoose.model('Item', schema);