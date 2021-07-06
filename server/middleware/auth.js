module.exports = options => {
    const jwt = require('jsonwebtoken');   // 引入 jsonwebtoken 用于处理 token
    const AdminUser = require('../models/AdminUser');   // 引入模型

    return (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop();
        if(!token){
            return res.status(401).send({
                message: '请先登录'
            })
        }
        const {id} = jwt.verify(token, req.app.get('secret'));
        AdminUser.findById(id).then(function(user){
            req.user = user;
            if(!(token && id && req.user)){
                return res.status(401).send({
                    message: '请先登录'
                })
            }
        })
        next();
    }
}