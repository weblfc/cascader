import Vue from 'vue';
import {
  Checkbox
} from "ant-design-vue"
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import '@geoman-io/leaflet-geoman-free';  
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';  

Vue.use(Checkbox)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
