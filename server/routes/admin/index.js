module.exports = app=>{
    const express = require('express');
    const multer = require('multer');
    const jwt = require('jsonwebtoken');
    const AdminUser = require('../../models/AdminUser');

    const router = express.Router();
    // 处理资源路由
    router.post('/', async (req, res)=>{
        const model = await req.Model.create(req.body);
        res.send(model);
    })
    router.get('/', async (req, res)=>{
        const queryOptions = {};
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10);
        res.send(items);
    })
    router.get('/:id', async (req, res)=>{
        const model = await req.Model.findById(req.params.id);
        res.send(model);
    })
    router.put('/:id', async (req, res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    })
    router.delete('/:id', async (req, res)=>{
        await req.Model.findByIdAndDelete(req.params.id);
        res.send({
            success: true
        })
    })

    // 验证登录权限
    const authMiddleware = require('../../middleware/auth');
    const resourceMiddleware = require('../../middleware/resource');
    // 拦截资源路由加中间件
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router);
    // 图片上传路由
    const upload = multer({dest: __dirname + '/../../uploads'});
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    })
    // 登录路由
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body;
        // 1. 根据用户名找用户
        const user = await AdminUser.findOne({username}).select('+password');
        if(!user){
            return res.status(422).send({
                message: '用户不存在'
            })
        }
        // 2. 校验密码
        const isValid = require('bcrypt').compareSync(password, user.password);
        if(!isValid){
            return res.status(422).send({
                message: '密码错误'
            })
        }
        // 3. 返回 token
        const token = jwt.sign({ id: user._id }, app.get('secret'));
        res.send({token});
    })
}