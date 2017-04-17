<template>


  <div class="cheers">
  <header-component :msg="query" @messageChanged="query = $event"></header-component>
  <div class="container">

  <div class="col-md-8 wegot float-left">
  <h1>Vídeo em destaque </h1>
    <youtube :video-id="videoPlayerid"></youtube>

    <div class="fitcontent" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      <transition name="fade">
      <div class="testing" v-bind:class="{'is-collapsed' : collapsed }">
        <div class="topfit">

          <p class="bigtitle float-left">{{bigVtitle}}</p>

          <div class="icons float-right">
              <b-popover placement="bottom" :triggers="['hover']" class="float-left">
                 <a variant=""><img class="icon" src="assets/views.png" alt=""></a>
                <p class="float-left" href="#" slot="content">
                {{viewCountz}} views
                </p>
              </b-popover>

              <b-popover placement="bottom" :triggers="['hover']" class="float-left">
                 <a variant=""><img class="icon" src="assets/data.png" alt=""></a>
                <p class="float-left" href="#" slot="content">
                {{dataVideoz}}
                </p>
              </b-popover>
          </div>

        </div>

        <div class="biggah">
          <p class="bigdesc">{{bigVdesclitle}}</p>
        </div>
      </div>
     </transition> 
    </div>
  </div>

  <div class="col-md-4 wegot float-right">
    <h2>+ Videos</h2>
  </div>

  <div class="col-md-4 float-right gotcha">
    <div class="scroll-me">
    <div class="video-news-item" v-for="item in search">
     
        <a href="#" title=""  v-on:click.stop.prevent="showId(item)">
          <div class="titleview"><a class="float-right"> {{ item.snippet.title | truncate }}</a></div>
          <img class="float-left" v-bind:src="item.snippet.thumbnails.medium.url">
        </a>
    </div>

    <infinite-loading :on-infinite="onInfinite" :distance="100" ref="infiniteLoading">
      <span slot="no-more">
        Cabô os vídeo, migo !
      </span>
    </infinite-loading>
    </div>




      <!-- 
    <li v-for="(video, index) in videos">
      <p> {{ video.snippet.title }} </p>
      <p> {{ video.snippet.resourceId.videoId }} </p>
      <img v-bind:src="video.snippet.thumbnails.medium.url">
      <a href="#" title=""  v-on:click.stop.prevent="showId(video)">CLICK ME</a>
    </li> -->


  </div>

  </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import Loadmore from 'vue-loadmore';
import moment from 'moment';
import Header from './Header.vue';

const api = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=UUWPQB43yGKEum3eW0P9N_nQ&key=AIzaSyD7MiRMjxkP3gPqpow7QoSG6Ontpg3ahNk';

export default {
  name: 'Channellist',
  
   data: function(){
      return {
        query: '',
        collapsed: true,
        videos: [],
        list: [],
        videoCounter: [],
        allLoaded: false,
        videoPlayerid: '',
        someGetter: '',
        bigVtitle: '',
        bigVdesc: '',
        bigVdesclitle: '',
        viewCountz: '',
        dateCountz: '',
        itemsTitle: ''
      };
    },
    created(){
      this.axios.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=UUWPQB43yGKEum3eW0P9N_nQ&key=AIzaSyD7MiRMjxkP3gPqpow7QoSG6Ontpg3ahNk').then((response) => {
        // console.log(response);
          // console.log(response.data);
          let videoList = response.data.items;
          // console.log(videoList);
          this.videos = videoList;
          this.bigVtitle = this.videos[0].snippet.title;
          this.bigVdesc = this.videos[0].snippet.description;
          this.bigVdesclitle = this.videos[0].snippet.description;
          this.dateCountz = this.videos[0].snippet.publishedAt;


        })
      console.log('created');
    },
    mounted: function() {
      console.log('mounted');
      this.videoPlayerid = 'LUsCP2aa2Is'

      let viewsGet = 'https://www.googleapis.com/youtube/v3/videos?id='+ this.videoPlayerid +'&key=AIzaSyD7MiRMjxkP3gPqpow7QoSG6Ontpg3ahNk&part=snippet,contentDetails,statistics,status';

      this.axios.get(viewsGet).then((response) => {
        let videoCountard = response.data.items;
        this.videoCounter = videoCountard;
        this.viewCountz = this.videoCounter[0].statistics.viewCount;
      })


    },
    methods: {
        onInfinite() {
        this.$http.get(api, {
          params: {
            page: this.list.length / 5 + 1,
          },
        }).then((res) => {
          if (res.data.items.length) {
            this.list = this.list.concat(res.data.items);
            this.itemsTitle = res.data.items.title;
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
            if (this.list.length / 5 === 20) {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            }
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          }
        });
      },
      mouseEnter() {
       console.log('mouseenter');
       this.collapsed = !this.collapsed
      },

      mouseLeave() {
       console.log('mouseleave');
       this.collapsed = !this.collapsed
      },


      showId: function(idss){

        this.videoPlayerid = idss.snippet.resourceId.videoId;
        this.bigVtitle = idss.snippet.title;
        this.bigVdesc = idss.snippet.description; 
        this.bigVdesclitle = idss.snippet.description; 
        this.dateCountz = idss.snippet.publishedAt;

       let viewsGet = 'https://www.googleapis.com/youtube/v3/videos?id='+ this.videoPlayerid +'&key=AIzaSyD7MiRMjxkP3gPqpow7QoSG6Ontpg3ahNk&part=snippet,contentDetails,statistics,status';

      this.axios.get(viewsGet).then((response) => {
        let videoCountard = response.data.items;
        this.videoCounter = videoCountard;
        this.viewCountz = this.videoCounter[0].statistics.viewCount;
      })

      },
       moment: function () {
        return moment.locale('es');
      }
    },
    computed: {
    // a computed getter
    dataVideoz: function () {
       moment.locale('pt');
        // `this` points to the vm instance
        return moment(this.dateCountz).format("DD MMMM YYYY");
      },
      
      search: function () {
        var query = this.query
        return this.list.filter(function (item) {
          let trial = item.snippet.title;
          return trial.includes(query)
        })
      }
    },
    filters: {
  
      truncate: function(string) {
        return string.substring(0, 40) + '...';
      }
    
    },
    components: {
    InfiniteLoading,
    'loadmore': Loadmore,
    'header-component': Header,
  },

};
</script>