<template>
  <header class="header">
    <div class="container">
      <a href="/" title=""><img class="logo float-left" src="/../assets/logo.png"/></a>
      <menu-component class="float-right"></menu-component>

      <div class="tester pull-right right-inner-addon" @mouseenter="searchEnter" @mouseleave="searchLeave"  v-bind:class="{'is-collapsedham' : collapsedham }">
       <icon name="search" color="white" class="gottageticon"></icon>
        <input class="float-right" placeholder="O que procura ?" type="text" name="" :value="msg" @input="changeMessage" >
      </div>
    </div>
  </header>
</template>

<script>

import Menucomponent from './Menucomponent.vue';
import Input from './Input.vue';
import 'vue-awesome/icons/flag';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon.vue';

export default {
   props: [
            'msg'
        ],
  name: 'Header',
  data: function(){
      return {
        query: '',
        collapsedham: true,
      };
    },
  methods: {
     changeMessage(event) {
      this.query = event.target.value;
      this.$emit('messageChanged', this.query);
    },
    searchEnter() {
     console.log('mouseenter');
     this.collapsedham = !this.collapsedham
    },

    searchLeave() {
     console.log('mouseleave');
     this.collapsedham = !this.collapsedham
    },
  },
  components: {
    'menu-component': Menucomponent,
    'input-component': Input,
    Icon
  },

};
</script>
