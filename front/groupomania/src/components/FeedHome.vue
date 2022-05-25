<template>
  <div id="feed">
    <div
      v-for="post in posts"
      :key="post.post.id"
      :data-id="post.post.id"
      class="post"
    >
      <div class="wrapper-side-post">
        <a :href="profileUrl(post.post.UserId)">
          <img
            class="user"
            src="@/assets/Groupomania-user.svg"
            alt="groupomania user"
          />
        </a>
        <!-- // delete button v-if check user logged and user create the post -->
        <button
          @click="editPost"
          v-if="
            post.post.UserId == $store.state.user.id ||
            $store.state.user.admin == true
          "
          class="update"
        >
          Update
        </button>
        <button
          @click="deletePost"
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
          <a :href="profileUrl(post.post.UserId)" class="wrapper-text">
            <h2>{{ post.user.name + " " + post.user.lastname }}</h2>
            <h3>{{ post.user.job }}</h3>
          </a>
          <div id="date">{{ postDate(post.post.createdAt) }}</div>
        </div>
        <a class="post-content">
          <div class="caption">
            {{ post.post.caption }}
          </div>
          <div class="wrapper-update">
            <button @click="cleanEdit()">Back</button>
            <button @click="updatePost">Confirm</button>
            <!-- Maybe addd file button but update a post with modify the image is non-sense -->
          </div>
          <img id="post-img" :src="post.post.imgUrl" alt="post img" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FeedHome",
  computed: {
    ...mapGetters(["posts", "user"]),
  },
  methods: {
    profileUrl(postUserId) {
      if (postUserId == this.user.id) {
        return `/me?id=${postUserId}`;
      } else return `/user?id=${postUserId}`;
    },
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
    deletePost: function deletePost(deleteButton) {
      const post = deleteButton.target.closest("div.post");
      const id = post.getAttribute("data-id");
      console.log(post.getAttribute("data-id"));
      fetch(`http://localhost:3000/api/post/delete?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      post.remove();
    },
    cleanEdit() {
      const postsContent = document.querySelectorAll(".post-content");
      postsContent.forEach((el) => {
        el.classList.remove("edit");
        el.querySelector(".caption").removeAttribute("contenteditable");
      });
    },
    editPost: function updatePost(edit) {
      this.cleanEdit();
      const post = edit.target.closest("div.post");
      const postContent = post.querySelector(".post-content");
      const caption = postContent.querySelector(".caption");
      postContent.classList.add("edit");
      caption.setAttribute("contenteditable", "true");
      caption.focus();
    },
    updatePost: function updatePost(edit) {
      const post = edit.target.closest("div.post");
      const caption = post.querySelector(".caption");
      const id = post.getAttribute("data-id");

      const postContent = { caption: caption.innerText };

      fetch(`http://localhost:3000/api/post/update?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(postContent),
      });

      this.cleanEdit();
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
  align-items: flex-start;
  justify-content: flex-start;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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
