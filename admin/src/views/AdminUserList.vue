<template>
  <div class="category-list">
    <h1>管理员列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/admin_user/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'admin_user-list',
    data() {
      return {
        items: []
      }
    },
    created () {
      this.fetch();
    },
    methods: {
      // 获取数据
      async fetch() {
        this.$http.get('rest/admin_users').then((res)=>{
          this.items = res.data;
        })
      },
      // 删除分类
      remove(row){
        this.$confirm(`是否确定要删除管理员${row.username}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$http.delete(`rest/admin_users/${row._id}`).then(()=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetch();
          })
        });
      }
    },
  }
</script>
