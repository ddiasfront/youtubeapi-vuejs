<template>
  <div class="menu">
      <b-popover placement="bottom">
         <a variant="">Menu</a>
        <a class="testinglinks float-left" href="/" slot="content">
	      <img src="/../assets/star.png" alt=""> Destaques
        </a>
        <a class="testinglinks lastchild float-left" href="/allvideos" slot="content">
           <img src="/../assets/play.png" alt="">Vídeos
        </a>
      </b-popover>
  </div>
</template>

<script>

export default {

  name: 'Menucomponent',

  
   data: function(){
      return {
     
      };
    }
};
</script>