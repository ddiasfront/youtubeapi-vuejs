<template>
  <div id="root">
<header-component :msg="query" @messageChanged="query = $event"></header-component>
    <div class="container">
        <h1>Todos os vídeos do canal</h1>
        <div class="allvideos-item" v-for="item in search"> 
          <div class="holder col-md-6 col-xs-6 col-sm-12 col-lg-4 float-left" @click="$root.$emit('show::modal','modal1')" v-on:click.stop.prevent="showId(item)">
            <img class="float-left" v-bind:src="item.snippet.thumbnails.medium.url">
            <div class="titleview float-left"><a> {{ item.snippet.title | truncate }}</a></div>
          </div>
        </div>
        <infinite-loading :on-infinite="onInfinite" :distance="100" ref="infiniteLoading">
          <span slot="no-more">
            Cabô os vídeo, migo !
          </span>
        </infinite-loading>
    </div>

    <b-modal id="modal1" :hide-footer="true" @hidden="pause" size="lg">
      <youtube :video-id="videoPlayerid"  @ready="ready" ></youtube>

    <div class="fitcontent">
      <transition name="fade">
      <div class="testing">
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
          <p class="bigdesc">{{bigVdesc}}</p>
        </div>
      </div>
     </transition> 
    </div>
    </b-modal>

  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import moment from 'moment';
import Reaction from './Reaction.vue' //or wherever
import Header from './Header.vue';

import Input from './Input.vue';

const api = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=UUWPQB43yGKEum3eW0P9N_nQ&key=AIzaSyD7MiRMjxkP3gPqpow7QoSG6Ontpg3ahNk';


export default {

  props:['msg'],
  name: 'Allvideos',
  data: function(){
      return {
        reaction: 'My reaction',
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
        itemsTitle: '',
        reaction: 'My reaction',
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
          this.videoPlayerid = this.videos[0].snippet.resourceId.videoId;


        })
      console.log('created');

    },
  methods: {

  ready (player) {
      this.player = player
    },

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
   pause() {
     this.player.pauseVideo();
      console.log('clicked');
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

    changeMessage(event) {
      this.query = event.target.value;
      this.$emit('messageChanged', this.query);
    },
    destroyReaction(reaction) {
                alert(reaction)
            },
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
    'input-component': Input,
    Reaction,
    'header-component': Header,

  },
};
</script>
