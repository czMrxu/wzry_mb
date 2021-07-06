<template>
  <div class="category-create">
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})">
          <i class="el-icon-plus"></i>
          添加广告
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="24" v-for="(item, index) in model.items" :key="index">
              <el-form-item label="链接">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label="图片" style="margin-top: 0.5rem">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'image', res.url)">
                  <img v-if="item.image" :src="item.image" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.items.splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'ad-create',
    data() {
      return {
        model: {
          items: []
        }
      }
    },
    props: ["id"],   // 获取页面传递的值
    mounted () {
      this.id && this.fetch();   // 判断是创建还是编辑
    },
    methods: {
      // 获取数据
      async fetch(){
        this.$http.get(`rest/ads/${this.id}`).then((res)=>{
          this.model = res.data;
        })
      },
      // 保存数据
      async save() {
        if(this.id){
          this.$http.put(`rest/ads/${this.id}`, this.model).then(()=>{
            this.$message({
              type: 'success',
              message: '广告位修改成功'
            })
          })
        }else{
          this.$http.post('rest/ads', this.model).then(()=>{
            this.$message({
              type: 'success',
              message: '广告位创建成功'
            })
          })
        }
        this.$router.push('/ad/list');
      },
    },
  }
</script>