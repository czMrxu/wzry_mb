<template>
  <div class="category-create">
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'category-create',
    data() {
      return {
        model: {},
        parents: {},
      }
    },
    props: ["id"],   // 组件传递的数据
    mounted () {
      this.id && this.fetch();   // 编辑与创建
      this.fetchParent();
    },
    methods: {
      // 获取详情数据
      async fetch(){
        this.$http.get(`rest/categories/${this.id}`).then((res)=>{
          this.model = res.data;
        })
      },
      // 获取数据
      async fetchParent(){
        this.$http.get(`rest/categories`).then((res)=>{
          this.parents = res.data;
          console.log(res.data);
        })
      },
      // 保存数据
      async save() {
        if(this.id){
          this.$http.put(`rest/categories/${this.id}`, this.model).then(()=>{
            this.$message({
              type: 'success',
              message: '分类修改成功'
            })
          })
        }else{
          this.$http.post('rest/categories', this.model).then(()=>{
            this.$message({
              type: 'success',
              message: '分类创建成功'
            })
          })
        }
        this.$router.push('/category/list');
      },
    },
  }
</script>