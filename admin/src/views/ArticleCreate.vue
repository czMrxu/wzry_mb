<template>
  <div class="category-create">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <!-- 使用富文本编辑器的图片自定义保存方法 -->
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor';   // 引入富文本编辑器
  export default {
    name: 'article-create',
    data() {
      return {
        model: {},
        categories: [],
      }
    },
    props: ["id"],   // 组件传递的值
    components: {
      VueEditor,
    },
    mounted () {
      this.id && this.fetch();   // 创建与编辑
      this.fetchCategories();
    },
    methods: {
      // 获取数据
      async fetch(){
        this.$http.get(`rest/articles/${this.id}`).then((res)=>{
          this.model = res.data;
        })
      },
      // 获取分类数据
      async fetchCategories(){
        this.$http.get(`rest/categories`).then((res)=>{
          this.categories = res.data.filter(item => item.parent && item.parent._id=='60deff8d0989682b44883ec5')
          console.log(this.categories);
        })
      },
      // 存储数据
      async save() {
        if(this.id){
          this.$http.put(`rest/articles/${this.id}`, this.model).then(()=>{
            this.$message({
              type: 'success',
              message: '文章修改成功'
            })
          })
        }else{
          this.$http.post('rest/articles', this.model).then(()=>{
            this.$message({
              type: 'success',
              message: '文章创建成功'
            })
          })
        }
        this.$router.push('/article/list');
      },
      // 自定义图片上传
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        var formData = new FormData();
        formData.append("file", file);

        this.$http.post("upload", formData).then((res)=>{
          Editor.insertEmbed(cursorLocation, "image", res.data.url);
          resetUploader();
        }).catch(err => {
          console.log(err);
        });
      }
    },
  }
</script>