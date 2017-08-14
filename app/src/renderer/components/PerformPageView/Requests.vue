<template>
  <div class="requests-wrapper">
    <ul>
      <li v-for="(request,index) in requests">
        {{request.username}}点播了: {{request.songname}}
        <button type="button" name="button" @click="acceptRequest(index)">接受</button>
        <button type="button" name="button" @click="unacceptRequest(index)">不接受</button>
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    data() {
      return {
      };
    },
    computed: {
      requests() {
        return this.$store.state.perform.requests;
      },
    },
    methods: {
      acceptRequest(i){
        console.log(this.requests[i]);
        this.$socket.emit('req_MusixiserPickSong', { type: 1, audienceName: this.requests[i].username, songName: this.requests[i].songname });
      },
      unacceptRequest(i){
        this.$socket.emit('req_MusixiserPickSong', { type: 0, audienceName: this.requests[i].username, songName: this.requests[i].songname });
      }
    },
  };
</script>

<style scoped lang="scss">
  .requests-wrapper {
    ul {
      li {list-style-type:none;}
    }
  }
</style>
