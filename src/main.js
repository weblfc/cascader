import Vue from 'vue';
import {
  Checkbox
} from "ant-design-vue"
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';

Vue.use(Checkbox)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
