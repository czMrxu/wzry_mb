import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http';
import './style.css';

Vue.config.productionTip = false;   // 阻止启动生产消息

Vue.prototype.$http = http;   // 挂载 http

Vue.mixin({   // 设置全局作用域块
  computed: {
    uploadUrl(){   // 上传路径
      return 'http://localhost:3000/admin/api/upload';
    }
  },
  methods: {
    getAuthHeaders(){   // 请求头
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
