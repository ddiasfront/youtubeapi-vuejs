<template>
  <div>
    <input class="float-left" type="text" name="" :value="msg" @input="changeMessage">
  </div>
</template>

<script>

export default {

  props:['msg'],
  name: 'Input',
  data: function(){
      return {
        query: '',
      };
    },
  components: {
  },
  methods: {
    changeMessage(event) {
      this.query = event.target.value;
      this.$emit('messageChanged', this.query);
    }
  }

};
</script>
