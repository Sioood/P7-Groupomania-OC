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
            <h2>{{ post.user.name + " " + post.user.lastname }}</h2>
            <h3>{{ post.user.job }}</h3>
          </div>
          <div id="date">{{ postDate(post.post.createdAt) }}</div>
        </div>
        <div class="post-content">
          <div class="caption">
            {{ post.post.caption }}
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
  methods: {
    postDate(date) {
      const today = new Date();

      const postDate = new Date(date);
      // console.log(today.getTime() + " - " + postDate.getTime());
      let formattedDate = postDate.toLocaleString();
      // date.split("T")[0] + " - " + date.split("T")[1].split(".")[0];
      if (today - postDate <= 86400000) {
        // 86400000 is one day - post less than 1 day old display only time
        formattedDate = postDate.toLocaleString().split(",")[1];
      }

      return formattedDate;
    },
  },
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
  margin: 0 0 15px 0;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
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
