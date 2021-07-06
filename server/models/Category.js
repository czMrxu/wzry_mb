const mongoose = require('mongoose');

const schema = new mongoose.Schema({   // 设置分类表字段
    name: {type: String},
    parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},
})

module.exports = mongoose.model('Category', schema);