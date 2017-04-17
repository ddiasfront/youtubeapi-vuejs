<template>
  <div>
  <p>{{myMessage}}</p>
  </div>
</template>

<script>

export default {

  name: 'Videocomponent',
  props: ['myMessage'],
  
   data: function(){
      return {
     
      };
    },
};
</script>