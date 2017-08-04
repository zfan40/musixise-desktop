<script>
  const Vibrant = require('node-vibrant');// img color exteracter
  const MARQUEE_SPEED = 30;
  export default {
    props: {
      text: {
        type: String
      },
    },
    data() {
      return {
        title: 'empty-section-componenet',
      };
    },
    methods: {
    },
    computed: {
    },
    created() {
    },
    mounted() {

    },
    updated() {

    },
  };
</script>

<template>
    <div class="empty-container">
        <img class="empty-icon" src="./assets/boya.svg"></img>
        <p class="empty-text">{{text}}</p>
    </div>
</template>

<style lang="scss" scoped>

  .empty-container {
    position: relative;
    display: flex;
    flex-direction:column;
    width:100%;
    height:100%;
    align-items:center;
    justify-content: center;
    .empty-icon {
      width:30%;
    }
    .empty-text {
      padding-top: 20px;
      padding-left:15px;
      font-size:21px;
      line-height:40px;
      color:#979797;
    }
  }
</style>
