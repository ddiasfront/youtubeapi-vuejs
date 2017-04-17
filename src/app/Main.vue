<template>
  <div id="root">
    <main>
      <router-view ></router-view>
    </main>
  </div>
</template>

<script>
import Title from './Title.vue';
import Footer from './Footer.vue';


export default {
  name: 'Main',
  components: {
    'title-component': Title
  }
};
</script>
