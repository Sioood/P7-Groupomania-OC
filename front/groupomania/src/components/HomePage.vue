<template>
  <div id="home">
    <h1 @click="test()">Hello World</h1>
    <div v-if="token" id="dashboard">
      <div id="feed">
        <div v-for="post in $store.state.posts" :key="post.id" class="post">
          <img
            id="user"
            src="@/assets/Groupomania-user.svg"
            alt="groupomania user"
          />
          <div class="wrapper-post">
            <div class="post-info">
              <div class="wrapper-text">
                <h3>Lastname Name</h3>
                —
                <h4>Job</h4>
                <div id="date">01/01/0001</div>
              </div>
            </div>
            <div class="post-content">
              <div class="caption">
                {{ post.caption }}
              </div>
              <img
                id="post-img"
                src="@/assets/Groupomania-user.svg"
                alt="groupomania user"
              />
            </div>
          </div>
        </div>
      </div>
      <div id="trend"></div>
      <div id="pannel"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "HomePage",
  data() {
    return {
      token: true,
    };
  },
  methods: {
    ...mapActions(["getPosts"]),
    test() {
      console.log("test");
      this.$store.dispatch("getPosts", 3);
    },
  },
  beforeCreate() {
    this.$store.dispatch("getPosts", 4);
  },
};
</script>

<style scoped>
#home {
  width: 100%;
  height: 91.6vh;
  overflow: hidden;
}

#dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  background: #000;
}

#feed {
  background: green;
  flex: 1 1 600px;
  overflow-y: scroll;
}

.post {
  padding: 5%;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  gap: 25px;
  background: var(--third-color);
}

#user {
  margin: 0;
  width: 75px;
  height: 75px;
}

.wrapper-post {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}

.post-info {
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 30px;
}

.wrapper-text {
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 15px;
}

.wrapper-text > * {
  margin: 0;
}

.post-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
}

#post-img {
  width: 100%;
}

#trend {
  background: #000;
  flex: 1 1 150px;
}

#pannel {
  background: red;
  flex: 1 1 200px;
}
</style>
