<template>
  <div class="main">
    <section class="player">
      <div class="player__timer">
        <div class="player__timer__elapsed" v-text="player.elapsed"></div>
        
        <div class="player__timer__total" v-text="currentTrack.duration"></div>
      </div>
      
      <div class="slider player__progress-bar">  
        <input type="range" :value="player.elapsed" :max="currentTrack.duration" />
      </div>
      
      <ul class="player__controls">
        <li
          class="control control--small"
          v-bind:class="{
            'control--active' : player.repeat,
            'control--dimmed' : !player.repeat
          }"
          @click="toggleRepeat"
        >

          <svg class="icon" viewbox="0 0 100 100">
            <use xlink:href="#repeat"></use>
          </svg>
        </li>
      
        <li class="control" @click="skipBack">
          <svg class="icon" viewbox="0 0 100 100" >
            <use xlink:href="#skip-back"></use>
          </svg>
        </li>
      
      </ul>
    </section>
    
    <svg xmlns="http://www.w3.org/2000/svg" class="hide">
      <symbol id="play" viewBox="0 0 23.2 26.2">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M23 11.6L6.7 2.4c-1.4-.8-2.6 0-2.6 1.8V22c0 1.8 1.2 2.7 2.6 1.8L23 14.6c1.5-.8 1.5-2.2 0-3z" />
      </symbol>
      <symbol id="repeat" viewBox="0 0 26.2 26.2">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1 2.1v4h-10c-3.3 0-6 2.7-6 6 0 1 .3 1.9.7 2.8l2.5-1.8c-.1-.3-.2-.7-.2-1 0-1.7 1.3-3 3-3h10v4l8-5v-1l-8-5zm4.8 11c.1.3.2.7.2 1 0 1.7-1.3 3-3 3h-10v-4l-8 5v1l8 5v-4h10c3.3 0 6-2.7 6-6 0-1-.3-1.9-.7-2.8l-2.5 1.8z"
          />
      </symbol>
      <symbol id="share" viewBox="0 0 26.2 26.2">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1 23.1h-20v-20h10l2-2h-12c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-7l-2 2v5zm-18-2c3-8 7-8 13-8v4l7-7-7-7v4c-13 0-13 10-13 14z" />
      </symbol>
      <symbol id="shuffle" viewBox="0 0 26.2 26.2">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1 1.1v4h-3c-3.3 0-6 2.7-6 6v4c0 1.7-1.3 3-3 3h-4v3h4c3.3 0 6-2.7 6-6v-4c0-1.7 1.3-3 3-3h3v4l8-5v-1l-8-5zM6.4 8.4L8.2 6c-.9-.6-2-.9-3.1-.9h-4v3h4c.5 0 .9.1 1.3.3zm10.7 9.7h-3c-.5 0-.9-.1-1.3-.3L11 20.2c.9.6 2 .9 3.1.9h3v4l8-5v-1l-8-5v4z"
          />
      </symbol>
      <symbol id="skip-back" viewBox="0 0 26.2 26.2">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M23.3 5.3l-8.2 4.8V6.7c0-1.3-.8-1.9-1.8-1.3L6.1 9.5V7.1c0-1.1-.9-2-2-2h-1c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h1c1.1 0 2-.9 2-2v-2.4l7.2 4.2c1 .6 1.8 0 1.8-1.3v-3.5l8.2 4.8c1 .6 1.8 0 1.8-1.3V6.7c0-1.4-.8-2-1.8-1.4z"
          />
      </symbol>
      <symbol id="skip-forward" viewBox="0 0 26.2 26.2">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1 5.1h-1c-1.1 0-2 .9-2 2v2.4l-7.2-4.2c-1-.6-1.8 0-1.8 1.3v3.5L2.9 5.3c-1-.6-1.8 0-1.8 1.3v12.9c0 1.3.8 1.9 1.8 1.3l8.2-4.8v3.5c0 1.3.8 1.9 1.8 1.3l7.2-4.2V19c0 1.1.9 2 2 2h1c1.1 0 2-.9 2-2V7c0-1-.9-1.9-2-1.9z"
          />
      </symbol>
      <symbol id="volume" viewBox="0 0 26.2 26.2">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1 13.1c0-3.3-2-6.2-4.9-7.4l-.8 1.8c2.2.9 3.7 3 3.7 5.5s-1.5 4.6-3.7 5.5l.8 1.8c2.9-1 4.9-3.9 4.9-7.2zm-4 0c0-1.7-1-3.1-2.5-3.7l-.8 1.8c.7.3 1.2 1 1.2 1.8s-.5 1.5-1.2 1.8l.8 1.8c1.5-.4 2.5-1.8 2.5-3.5zM17.7 2l-.8 1.8c3.6 1.5 6.2 5.1 6.2 9.2 0 4.2-2.5 7.7-6.2 9.2l.8 1.8c4.3-1.8 7.4-6.1 7.4-11.1s-3-9.1-7.4-10.9zM1.1 8.1v10h4l7 7v-24l-7 7h-4z"
          />
      </symbol>
      <symbol id="pause" viewBox="0 0 26.2 26.2">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.1 2.1h-4c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-18c0-1.1-.9-2-2-2zm14 0h-4c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-18c0-1.1-.9-2-2-2z" />
      </symbol>
    </svg>
  </div>
  
</template>

<script>

export default {

  // data is diff
  // data() {
  data() {
    return {
      player: {
        currentTrack: 0, // current tracck index
        elapsed: 0, // how many time pass
        playing: false, // is it playing
        repeat: false, // is it repeat
        shuffle: true, // is it shuffle
        volume: 68, // volumne .....
      }, // end player
      playlist: {
        title: 'Designers MX - Open Space', // title of the playlist
        author: 'Kyle Barret', // whoever upload
        // tracks
        tracks: [{
          title: 'Window', // title
          artist: 'The Album Leaf', // artist
          album: 'In a Safe Place', // album
          duration: 274, // duration
          // cover
          cover: {
            // small cover
            small: 'http://is5.mzstatic.com/image/pf/us/r30/Music/y2004/m06/d11/h18/s05.tjsjltyd.100x100-75.jpg',
            // large cover
            large: 'https://yuq.me/albums/79/690/3374011100.jpg',
          },
        },
        {
          title: 'Dayvan Cowboy',
          artist: 'Boards of Canada',
          album: 'The Campfire Headphase',
          duration: 300,
          cover: {
            small: 'http://static.metacritic.com/images/products/music/8/a0c6c84a9d3ef6a577aee9a32d0b5b6f-98.jpg',
            large: 'http://boardsofcanada.com/vinyl-reissues/_/img/WARPLP123R-Packshot-800.jpg',
          },
        },
        {
          title: 'Adrift',
          artist: 'Tycho',
          album: 'Awake',
          duration: 283,
          cover: {
            small: 'http://cdn.ghostly.com/images/artists/34/albums/454/GI-208_1500x300_188_188.jpg',
            large: 'http://cdn.ghostly.com/images/artists/34/albums/454/GI-208_1500x300_540_540.jpg',
          },
        },
        {
          title: 'Arrival at Sydney Harbour',
          artist: 'Port Blue',
          album: 'The Airship',
          duration: 306,
          cover: {
            small: 'https://upload.wikimedia.org/wikipedia/ru/thumb/3/31/Port_Blue_-_The_Airship.jpg/200px-Port_Blue_-_The_Airship.jpg',
            large: 'https://upload.wikimedia.org/wikipedia/en/8/8f/Theairship.jpg',
          },
        },
        {
          title: 'The Backwards Step',
          artist: 'Hammock',
          album: 'Chasing After Shadows',
          duration: 289,
          cover: {
            small: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Chasing_after_shadows.jpg/100px-Chasing_after_shadows.jpg',
            large: 'http://f1.bcbits.com/img/a3547927520_10.jpg',
          },
        }],
      },
    }; // end return
  },
  // This parallel to data
  computed: {
    // current track is the current track obj
    // it is a func, but return value
    currentTrack: function currentTrack() {
      // this, playlist, tracks
      // this.player.currentTrack === index
      return this.playlist.tracks[this.player.currentTrack];
    },
    playlistDuration: function playlistDuration() {
      // duration
      let duration = 0;
      // tracks is array
      const tracks = this.playlist.tracks;
      // let i
      let i;

      // basically add up all track durations.
      for (i = 0; i < tracks.length; i += 1) {
        duration += tracks[i].duration;
      }

      return duration;
    },
  },
  methods: {
    // pause
    // func
    pause: function pause() {
      // if
      // this player, not playing
      // return
      if (!this.player.playing) {
        // not playing, so good
        return;
      }
      // this
      // dollar set
      // player.playing, false
      // it seems that is how you set variable
      this.$set('player.playing', false);
      // clean interval
      // this
      // .timer
      clearInterval(this.timer);
      // this
      // $set
      // timer
      // false
      this.$set('timer', false);
    },
    play: function play() {
      if (this.player.playing) {
        // it is playing, so return
        return;
      }
      // Need to use that
      const that = this;
      // const
      // timmer
      // set interval
      // arrow func
      const timer = setInterval(() => {
        // if
        // that player
        // elapsed
        // that.currentTrack is computed value
        // it has a single track
        // so can use .duration
        if (that.player.elapsed >= that.currentTrack.duration) {
          // this
          // $set
          // player.elapsed
          // 0
          // so song pass enough, so player.elapsed
          this.$set('player.elapsed', 0);
          // need to forward
          // that.skipForward();
        }
        that.player.elapsed += 0.1;
      }, 100);
      // this.$set('player.playing', true);
      this.player.playing = Object.assign(
        {},
        this.player.playing,
        { playing: true },
      );
      // this.$set('timer', timer);
      this.player.timer = Object.assign(
        {},
        this.player.timer,
        { timer },
      );
    },
    selectTrack: function selectTrack(id) {
      this.player.currentTrack = Object.assign(
        {},
        this.player.currentTrack,
        { currentTrack: id },
      );
      this.player.elapsed = Object.assign(
        {},
        this.player.elapsed,
        { elapsed: 0 },
      );
      // this.play();
    },
    skipForward: function skipForward() {
      // let track
      // this
      // player
      // current track
      // +1
      let track = this.player.currentTrack + 1;
      // track
      // mod
      // this
      // playlist
      // .tracks
      // .length
      track %= this.playlist.tracks.length;
      // this
      // select track
      // pass track index
      this.selectTrack(track);
    },
    skipBack: function skipBack() {
      // current song index
      // this
      // this
      // .player
      // .currentTrack
      let track = this.player.currentTrack;
      // if
      // this player
      // elapsed
      // < 2
      if (this.player.elapsed < 2) {
        // move a song back
        // it encourages shorthand
        track -= 1;
      }

      // < 0
      // song zero
      // need to be zero
      if (track < 0) {
        track = 0;
      }

      // this select track
      // track
      this.selectTrack(track);
    },
    toggleRepeat: function toggleRepeat() {
      // this
      // .player
      // .repeat
      // =
      // !this
      // .player
      // .repeat
      this.player.repeat = !this.player.repeat;
    },
    toggleShuffle: function toggleShuffle() {
      // this
      // .player
      // .shuffle
      this.player.shuffle = !this.player.shuffle;
    },
  },
};
</script>


<style lang="scss">
  // https://stackoverflow.com/questions/37031123/why-am-i-not-being-able-to-compile-sass-with-webpack
  @import '../assets/scss/style.scss';
</style>
