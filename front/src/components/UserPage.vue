<template>
  <div id="user-page">
    <div class="text">
      <div class="contact">
        <h1 class="fullname">{{ fullname }}</h1>
        <a :href="`mailto:${email}`" :title="email" class="email">
          <img src="@/assets/mail-icon.jpg" alt="mail icon" />
          <h4>{{ email }}</h4>
        </a>
        <h2 class="job">{{ job }}</h2>
      </div>
    </div>
    <div class="user-event">
      <div class="nav-event">
        <button id="posts" class="active" @click.prevent="eventPosts">
          Posts
        </button>
        <button id="comments" @click.prevent="eventComments">
          Commentaires
        </button>
      </div>
      <div v-show="events == 'posts'" class="posts events">
        <h1>Posts</h1>
        <PostTemplate
          v-for="post in posts"
          :key="post.post.id"
          :post="post"
          :dataId="post.post.id"
          :linkTo="post.post.id"
          :addComment="false"
        />
      </div>
      <div v-show="events == 'comments'" class="comments events">
        <h1>Commentaires</h1>
        <PostTemplate
          v-for="post in userPosts"
          :key="post.post.id"
          :post="post"
          :dataId="post.post.id"
          :linkTo="post.post.InCommentId"
          :addComment="false"
        />
      </div>
      <!-- <CommentTemplate
        v-for="comment in userPosts"
        :commentUser="comment.commentUser"
        :comment="comment"
        :key="comment.id"
        :commentId="comment.id"
      /> -->
    </div>
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
      events: "posts",
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
      commentLimit: null,
    });

    this.getPosts({
      id: null,
      userId: this.userId,
      limit: 0,
      comment: true,
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
    eventPosts: function eventPosts(event) {
      event.target.classList.add("active");
      const comments = document.getElementById("comments");
      comments.classList.remove("active");
      console.log(comments);
      this.getPosts({
        id: null,
        userId: this.userId,
        limit: 0,
        comment: false,
        commentLimit: 1,
      });

      this.events = "posts";
    },
    eventComments: function eventComments(event) {
      event.target.classList.add("active");
      const posts = document.getElementById("posts");
      posts.classList.remove("active");
      this.getPosts({
        id: null,
        userId: this.userId,
        limit: 0,
        comment: true,
        commentLimit: 1,
      });

      this.events = "comments";
    },
  },
  computed: {
    ...mapGetters(["user", "posts", "userPosts"]),
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.fullname {
  width: 100%;
}

.email {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  color: var(--main-color);
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

.user-event {
  position: relative;
  margin: 50px 0 0 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  gap: 35px;
}

.nav-event {
  margin: 0 0 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.nav-event > button {
  all: unset;
  padding: 10% 15% 10% 15%;
  width: 100%;
  border: 2px solid var(--main-color);
  cursor: pointer;
}

.nav-event > button:hover,
.nav-event > .active {
  background: var(--third-color);
}

.events {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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

<style scoped>
@media screen and (max-width: 640px) {
  .contact {
    margin: 0 0 15px 0;
    flex-direction: column;
  }

  .fullname {
    margin: 0;
  }

  .nav-event {
    width: 50vw;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .user-event {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
