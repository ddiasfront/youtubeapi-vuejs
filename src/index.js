import Vue from 'vue';
import Main from './app/Main.vue';
import Channellist from './app/Channellist.vue';
import Allvideos from './app/Allvideos.vue';
import VueFire from 'vuefire';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueYouTubeEmbed from 'vue-youtube-embed';
import BootstrapVue from 'bootstrap-vue';
import infiniteScroll from 'vue-infinite-scroll';
import VueRouter from 'vue-router';

Vue.use(VueFire);
Vue.use(VueAxios, axios);
Vue.use(VueYouTubeEmbed);
Vue.use(BootstrapVue);
Vue.use(infiniteScroll);
Vue.use(VueRouter);

const routes = [
  {path: '/', component: Channellist},
  {path: '/allvideos', component: Allvideos}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './index.scss';

export default new Vue({
  el: '#root',
  router,
  render: h => h(Main)
});
