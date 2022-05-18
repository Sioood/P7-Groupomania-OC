<template>
  <div id="feed">
    <a
      v-for="post in $store.state.posts"
      :href="post.id"
      :key="post.id"
      class="post"
    >
      <img
        class="user"
        src="@/assets/Groupomania-user.svg"
        alt="groupomania user"
      />
      <div class="wrapper-post">
        <div class="post-info">
          <div class="wrapper-text">
            <h2>Lastname Name</h2>
            <h3>Job</h3>
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
    </a>
  </div>
</template>

<script>
export default {
  name: "FeedHome",
  methods: {},
};
</script>

<style scoped>
.post {
  padding: 5%;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  gap: 25px;
  color: var(--main-color);
  border-bottom: 1px var(--main-color) solid;
  text-decoration: none;
}

.user {
  margin: 0;
  width: 75px;
  height: 75px;
}

.wrapper-post {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}

.post-info {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.wrapper-text {
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.wrapper-text > * {
  margin: 0;
}

.post-content {
  padding: 0 0 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  gap: 15px;
}

.caption {
  width: 100%;
}

#post-img {
  width: 100%;
}
</style>
