<template>
  <div class="post item" :data-id="dataId">
    <div class="wrapper-side-post">
      <a :href="profileUrl(post.post.UserId)">
        <img
          v-if="post.user.imgUrl"
          class="user"
          :src="$store.state.baseUrl + post.user.imgUrl"
          alt="groupomania user"
        />
        <img
          v-if="!post.user.imgUrl"
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
        <img src="@/assets/setting.svg" alt="update post" />
      </button>
      <button
        @click="deletePost"
        v-if="
          post.post.UserId == $store.state.user.id ||
          $store.state.user.admin == true
        "
        class="delete"
      >
        <img src="@/assets/bin.svg" alt="delete post" />
        <!-- {{
            post.post.UserId + " " + $store.state.user.id + " " + post.post.id
          }} -->
      </button>
    </div>
    <div class="wrapper-post">
      <span></span>
      <div class="post-info">
        <a :href="profileUrl(post.post.UserId)" class="wrapper-text">
          <h2>{{ post.user.name + " " + post.user.lastname }}</h2>
          <h3>{{ post.user.job }}</h3>
        </a>
        <div class="date">{{ postDate(post.post.createdAt) }}</div>
      </div>
      <div class="post-content item-content">
        <a
          :href="`/post?id=${linkTo}`"
          title="Afficher le post"
          class="caption item-caption"
        >
          {{ post.post.caption }}
        </a>
        <div class="wrapper-edit">
          <button @click="cleanEdit" class="edit-back">Back</button>
          <button @click="updatePost" class="edit-confirm">Confirm</button>
          <!-- Maybe add file button but update a post with modify the image is non-sense -->
        </div>
        <img
          v-if="post.post.imgUrl"
          class="post-img"
          :src="$store.state.baseUrl + post.post.imgUrl"
          alt="post img"
        />
        <div v-if="addComment != false" class="wrapper-comment">
          <span></span>
          <CommentTemplate
            v-for="comment in post.comments"
            :commentUser="comment.commentUser"
            :comment="comment"
            :key="comment.id"
            :commentId="comment.id"
          />

          <CommentTemplate
            v-for="comment in commentSent"
            :commentUser="loggedUser"
            :comment="comment"
            :key="comment.id"
            :commentId="comment.id"
          />

          <!-- add comment -->
          <div class="add-comment">
            <h4>Ajouter un commmentaire</h4>
            <form action="">
              <textarea
                v-model="sendCaption"
                name="add-comment-caption"
                class="add-comment-caption"
                cols="30"
                rows="1"
              ></textarea>
              <button
                @click.prevent="sendComment(post.post.id)"
                type="submit"
                class="send-comment"
              >
                <img src="@/assets/send.svg" alt="" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CommentTemplate from "./CommentTemplate.vue";

export default {
  name: "PostTemplate",
  components: {
    CommentTemplate,
  },
  props: ["post", "dataId", "linkTo", "addComment"],
  data() {
    return {
      savedCaption: "",
      sendCaption: "",
      commentSent: [],
      loggedUser: [this.user],
    };
  },
  mounted() {
    this.loggedUser = this.user;
  },
  computed: {
    ...mapGetters(["posts", "user"]),
  },
  methods: {
    profileUrl(postUserId) {
      if (postUserId == this.user.id) {
        return `/me`;
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
      const post = deleteButton.target.closest("div.item");
      const id = post.getAttribute("data-id");
      fetch(`${this.$store.state.baseUrl}/api/post/delete?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      post.remove();
      let index = this.posts.findIndex((object) => object.post.id == id);
      this.posts.splice(index, index + 1);
      console.log(this.posts);
    },
    cleanEdit: function cleanEdit(edit) {
      if (edit !== "clickOnAnotherPost" && edit !== "update") {
        const postContent = edit.target.closest(".item-content");
        const caption = postContent.querySelector(".item-caption");
        caption.innerText = this.savedCaption;
      }

      const postsContent = document.querySelectorAll(".item-content");
      postsContent.forEach((el) => {
        const post = el.closest(".item");

        console.log(`test${post.className.split(" ")[0]}`);
        el.classList.remove(`${post.className.split(" ")[0]}-edit`);
        el.querySelector(".item-caption").removeAttribute("contenteditable");
      });
    },
    editPost: function updatePost(edit) {
      this.cleanEdit("clickOnAnotherPost");
      const post = edit.target.closest("div.item");
      console.log(post.className.split(" ")[0]);
      const postContent = post.querySelector(".item-content");
      const caption = postContent.querySelector(".item-caption");
      this.savedCaption = caption.innerText;
      postContent.classList.add(`${post.className.split(" ")[0]}-edit`);
      caption.setAttribute("contenteditable", "true");
      caption.focus();
    },
    updatePost: function updatePost(edit) {
      const post = edit.target.closest("div.item");
      const caption = post.querySelector(".item-caption");
      const id = post.getAttribute("data-id");

      const postContent = { caption: caption.innerText };

      fetch(`${this.$store.state.baseUrl}/api/post/update?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(postContent),
      });

      this.cleanEdit("update");
    },
    sendComment(id) {
      const comment = {
        caption: this.sendCaption,
        UserId: this.loggedUser.id,
        InCommentId: id,
      };
      fetch(`${this.$store.state.baseUrl}/api/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(comment),
      })
        .then((response) => response.json())
        .then((comment) => this.commentSent.push(comment));
      this.sendCaption = "";
    },
  },
};
</script>

<style scoped>
* {
  text-decoration: none;
  color: var(--main-color);
}

span {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 75%;
  background: #000;
}

.post {
  position: relative;
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

.update > img,
.delete > img {
  width: 30px;
}

.wrapper-post {
  position: relative;
  padding: 0 0 0 15px;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  gap: 15px;
}

.caption {
  width: 100%;
}

.post-img {
  margin: 0;
  padding: 0;
  width: 70%;
  border-radius: 15px;
  /* border: 2px solid var(--main-color); */
  outline: 2px solid var(--main-color);
  outline-offset: -2px;
}

.post-edit > .item-caption {
  padding: 0.2rem;
  border: 2px var(--accent-color) solid;
  border-radius: 2px;
}

.post-edit > .wrapper-edit {
  display: flex;
}

.wrapper-edit {
  /* for edit display flex */
  width: 100%;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.edit-confirm {
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

.edit-back {
  padding: 15px 30px 15px 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--accent-color);
  border: none;
  border-radius: 500px;
  cursor: pointer;
}

.edit-back:hover {
  background: var(--accent-color);
  color: var(--third-color);
}

.wrapper-comment {
  position: relative;
  width: 100%;
  margin: 5% 0 0 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 30px;
  /* background: var(--third-color); */
  border-radius: 10px;
}

.add-comment {
  margin: 25px 0 0 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 15px;
}

.add-comment > form {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 15px;
}

.add-comment-caption {
  all: unset;
  padding: 15px;
  width: 80%;
  background: var(--third-color);
  border-radius: 5px;
  text-align: left;
}

.send-comment {
  all: unset;
  height: 20px;
  padding: 15px 30px 15px 30px;
  background: var(--main-color);
  color: var(--smooth-color);
  border-radius: 500px;
  font-weight: 600;
  cursor: pointer;
}

.send-comment > img {
  height: 100%;
}
</style>

<style>
.comment-edit > .item-caption {
  padding: 0.2rem;
  border: 2px var(--accent-color) solid;
  border-radius: 2px;
}

.comment-edit > .wrapper-edit {
  display: flex;
}
</style>

<style scoped>
@media screen and (max-width: 640px) {
  .post {
    flex-direction: column;
  }

  .wrapper-side-post {
    flex-direction: row;
  }

  .post-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }

  .wrapper-text {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }

  .wrapper-text > h3 {
    margin: 0 0 0 15px;
  }

  .date {
    margin: 0 0 19px 0;
    width: 100%;
    text-align: right;
  }

  .wrapper-comment {
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--main-color);
    border-radius: 0;
  }

  .add-comment > form {
    flex-direction: column;
  }
}
</style>
