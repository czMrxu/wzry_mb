<template>
  <div class="item-list">
    <h1>英雄列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="英雄称号"></el-table-column>
      <el-table-column prop="avatar" label="头像">
          <template slot-scope="scope">
              <img :src="scope.row.avatar" alt="" style="height: 3rem">
          </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/hero/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'hero-list',
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
        this.$http.get('rest/heros').then((res)=>{
          this.items = res.data;
        })
      },
      // 删除英雄
      remove(row){
        this.$confirm(`是否确定要删除英雄${row.name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$http.delete(`rest/heros/${row._id}`).then(()=>{
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
