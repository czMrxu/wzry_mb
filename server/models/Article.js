const mongoose = require('mongoose');

const schema = new mongoose.Schema({   // 设置分类表字段
    title: {type: String},
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
    body: {type: String}
})

module.exports = mongoose.model('Article', schema);