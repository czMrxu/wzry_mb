<template>
  <div class="item-create">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'item-create',
    data() {
      return {
        model: {}
      }
    },
    props: ["id"],   // 组件传递的数据
    mounted () {
      this.id && this.fetch();   // 编辑与创建
    },
    methods: {
      // 获取数据
      async fetch(){
        this.$http.get(`rest/items/${this.id}`).then((res)=>{
          this.model = res.data;
        })
      },
      // 保存数据
      async save() {
        if(this.id){
          this.$http.put(`rest/items/${this.id}`, this.model).then(()=>{
            this.$message({
              type: 'success',
              message: '物品修改成功'
            })
          })
        }else{
          this.$http.post('rest/items', this.model).then(()=>{
            this.$message({
              type: 'success',
              message: '物品创建成功'
            })
          })
        }
        this.$router.push('/item/list');
      },
      // 上传图片后的事件
      afterUpload(res){
        this.$set(this.model, 'icon', res.url);
      }
    },
  }
</script>