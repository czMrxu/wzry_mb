<template>
  <div class="category-create">
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'admin_user-create',
    data() {
      return {
        model: {}
      }
    },
    props: ["id"],   // 组件传递的值
    mounted () {
      this.id && this.fetch();   // 创建与编辑
    },
    methods: {
      // 获取数据
      async fetch(){
        this.$http.get(`rest/admin_users/${this.id}`).then((res)=>{
          this.model = res.data;
        })
      },
      // 保存数据
      async save() {
        if(this.id){
          this.$http.put(`rest/admin_users/${this.id}`, this.model).then(()=>{
            this.$message({
              type: 'success',
              message: '管理员修改成功'
            })
          })
        }else{
          this.$http.post('rest/admin_users', this.model).then(()=>{
            this.$message({
              type: 'success',
              message: '管理员创建成功'
            })
          })
        }
        this.$router.push('/admin_user/list');
      },
    },
  }
</script>