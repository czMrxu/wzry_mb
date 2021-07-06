module.exports = options => {
    return async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource);   // 将客户端请求的资源转换成首字母大写的复数单词
        req.Model = require(`../models/${modelName}`);   // 引入模型
        next();
    }
}