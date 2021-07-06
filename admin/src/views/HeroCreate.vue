<template>
  <div class="hero-create">
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="" type="border-card">
        <el-tab-pane label="基础信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
            <el-option v-for="item of categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item el-form-item label="难度">
            <el-rate style="margin-top: 0.6rem" v-model="model.scores.difficult" :max="10"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top: 0.6rem" v-model="model.scores.skills" :max="10"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top: 0.6rem" v-model="model.scores.attack" :max="10"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top: 0.6rem" v-model="model.scores.survive" :max="10"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.item1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.item2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input v-model="model.usageTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input v-model="model.battleTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="团队思路">
            <el-input v-model="model.teamTips" type="textarea"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})">
            <i class="el-icon-plus"></i>
            添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit" style="margin-top: 1rem">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'hero-create',
    data() {
      return {
        model: {
          name: '',
          avatar: '',
          title: '',
          scores: {}
        },
        categories: [],
        items: []
      }
    },
    props: ["id"],   // 组件传递的数据
    mounted () {
      this.id && this.fetch();   // 编辑与创建
      this.fetchCategories();
      this.fetchItems();
    },
    methods: {
      // 获取数据
      async fetch(){
        this.$http.get(`rest/heros/${this.id}`).then((res)=>{
          this.model = Object.assign({}, this.model, res.data);
        })
      },
      // 获取分类
      async fetchCategories(){
        this.$http.get('rest/categories').then((res)=>{
          // this.categories = res.data;
          this.categories = res.data.filter(item => item.parent && item.parent._id=="60df3580f6eaff56bc8838a9");
        })
      },
      // 获取物品
      async fetchItems(){
        this.$http.get('rest/items').then((res)=>{
          this.items = res.data;
        })
      },
      // 保存数据
      async save() {
        if(this.id){
          this.$http.put(`rest/heros/${this.id}`, this.model).then(()=>{
            this.$message({
              type: 'success',
              message: '英雄修改成功'
            })
          })
        }else{
          this.$http.post('rest/heros', this.model).then(()=>{
            this.$message({
              type: 'success',
              message: '英雄创建成功'
            })
          })
        }
        this.$router.push('/hero/list');
      },
      // 上传图片后操作
      afterUpload(res){
        this.model.avatar = res.url;
      }
    },
  }
</script>