<template>
  <div id="user-page">
    <div class="text">
      <div class="contact">
        <h1 class="fullname">{{ fullname }}</h1>
        <a :href="`mailto:${email}`" :title="email" class="email">
          <img src="@/assets/mail-icon.jpg" alt="mail icon" />
        </a>
      </div>
      <h2 class="job">{{ job }}</h2>
    </div>
    <PostTemplate
      v-for="post in posts"
      :key="post.post.id"
      :post="post"
      :dataId="post.post.id"
    />
    <!-- <div class="wrapper-post" v-for="post in userPosts" :key="post.id">
      <div id="date">{{ postDate(post.createdAt) }}</div>
      <a class="post-content">
        <div class="caption">
          {{ post.caption }}
        </div>
        <img id="post-img" :src="post.imgUrl" alt="post img" />
      </a>
    </div> -->
  </div>
</template>

<script>
import router from "@/router";
import { mapActions, mapGetters } from "vuex";

import PostTemplate from "@/components/PostTemplate.vue";

export default {
  name: "UserPage",
  components: {
    PostTemplate,
  },
  data() {
    return {
      userId: localStorage.getItem("id"),
    };
  },
  props: {
    fullname: String,
    email: String,
    job: String,
  },
  created() {
    if (router.currentRoute.path == "/user") {
      this.userId = router.currentRoute.query.id;
    }
    // modify with postTemplate and query paramameters
    this.getPosts({
      id: null,
      userId: this.userId,
      limit: 0,
      comment: false,
      commentLimit: 1,
    });
  },
  methods: {
    ...mapActions(["getPosts", "checkToken"]),
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
  },
  computed: {
    ...mapGetters(["user", "posts"]),
  },
};
</script>

<style scoped>
.text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  height: 1rem;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.7rem;
  font-weight: 500;
}

.contact {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.fullname {
  width: 100%;
}

.update {
  all: unset;
  color: var(--main-color);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
}

.delete {
  all: unset;
  color: var(--accent-color);
  cursor: pointer;
}

.wrapper-post {
  padding: 10%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-bottom: 1px var(--main-color) solid;
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

#date {
  width: 100%;
  text-align: right;
}

.post-content {
  padding: 0 0 0 15px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  gap: 25px;
}

.caption {
  width: 100%;
}

#post-img {
  width: 100%;
  height: auto;
  border-radius: 15px;
}

.edit > .caption {
  padding: 5%;
  border: 2px var(--accent-color) solid;
  border-radius: 2px;
}

.edit > .wrapper-update {
  display: flex;
}

.wrapper-update {
  /* for edit display flex */
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.wrapper-update > button {
  padding: 15px 30px 15px 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--main-color);
  color: var(--smooth-color);
  border: none;
  border-radius: 500px;
  cursor: pointer;
}

.wrapper-update > button:nth-child(1) {
  background: transparent;
  color: var(--accent-color);
}
</style>
