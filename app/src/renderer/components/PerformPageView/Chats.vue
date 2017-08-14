<template>
  <div class="chats-wrapper">
    <ul>
      <li v-for="chat in chats">
        <div class="other-chat" v-if="!chat.isMine">
          <p class="user-name">{{chat.username}}</p>
          <p class="chat-bubble">{{chat.msg}}</p>
        </div>
        <div class="my-chat" v-if="chat.isMine">
          <p class="chat-bubble">{{chat.msg}}</p>
          <p class="user-name">我</p>
        </div>
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
      chats() {
        return this.$store.state.perform.chats;
      },
    },
    methods: {

    },
  };
</script>

<style scoped lang="scss">
  .chats-wrapper {
    margin:10px 5px 40px;
    ul {
      li {
        position: relative;
        height:50px;
        .other-chat {
          position:absolute;top:5px;display:flex;align-items:center;list-style-type:none;height:40px;
          .user-name {margin-right:16px;}
          .chat-bubble {display:inline-block;position: relative; background-color:#00aabb; border-radius:8px;padding:5px 20px;max-width:300px;}
          .chat-bubble:after {content:'';position: absolute; left:0;top:50%;width:0;height: 0;border:6px solid transparent;
          border-right-color:#00aabb;border-left:0;border-top:0;margin-top:-3px;margin-left:-6px;}
        }
        .my-chat {
          position:absolute;top:5px;display:flex;align-items:center;justify-content:flex-end;list-style-type:none;height:40px;width:100%;
          .user-name {margin-left:12px;}
          .chat-bubble {display:inline-block;position: relative; background-color:#00aabb; border-radius:8px;padding:5px 20px;max-width:300px;}
          .chat-bubble:after {content:'';position: absolute; right:0px;top:50%;width:0;height: 0;border:6px solid transparent;
          border-left-color:#00aabb;border-right:0;border-top:0;margin-top:-3px;margin-right:-6px;}
        }

      }
    }

  }

</style>
