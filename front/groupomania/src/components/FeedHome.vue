<template>
  <div id="feed">
    <div v-for="post in $store.state.posts" :key="post.post.id" class="post">
      <div class="wrapper-side-post">
        <a :href="'/user?=' + post.user.id">
          <img
            class="user"
            src="@/assets/Groupomania-user.svg"
            alt="groupomania user"
          />
        </a>
        <!-- // delete button v-if check user logged and user create the post -->
        <button v-if="post.post.UserId == $store.state.user.id" class="update">
          Update
        </button>
        <button
          @click="deletePost(post.post.id)"
          v-if="post.post.UserId == $store.state.user.id"
          class="delete"
        >
          Delete
          <!-- {{
            post.post.UserId + " " + $store.state.user.id + " " + post.post.id
          }} -->
        </button>
      </div>
      <div class="wrapper-post">
        <div class="post-info">
          <a :href="'/user?=' + post.user.id" class="wrapper-text">
            <h2>{{ post.user.name + " " + post.user.lastname }}</h2>
            <h3>{{ post.user.job }}</h3>
          </a>
          <div id="date">{{ postDate(post.post.createdAt) }}</div>
        </div>
        <a :href="'/post/' + post.post.id" class="post-content">
          <div class="caption">
            {{ post.post.caption }}
          </div>
          <img id="post-img" :src="post.post.imgUrl" alt="post img" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeedHome",
  methods: {
    postDate(date) {
      const today = new Date();

      const postDate = new Date(date);
      let formattedDate = postDate.toLocaleString();
      if (
        today.toLocaleString().split(",")[0] ==
        postDate.toLocaleString().split(",")[0]
      ) {
        formattedDate = postDate.toLocaleString().split(",")[1];
      }

      return formattedDate;
    },
    deletePost(id) {
      fetch(`http://localhost:3000/api/post/delete?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      this.$parent.updateLimit();
    },
  },
};
</script>

<style scoped>
* {
  text-decoration: none;
  color: var(--main-color);
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
  color: var(--main-color);
  border-bottom: 1px var(--main-color) solid;
}

.user {
  margin: 0;
  width: 75px;
  height: 75px;
}

.wrapper-side-post {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.update {
  all: unset;
  color: var(--main-color);
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
}

.delete {
  all: unset;
  color: var(--accent-color);
  cursor: pointer;
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
