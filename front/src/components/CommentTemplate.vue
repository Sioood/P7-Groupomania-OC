<template>
  <!-- comment fetch -->
  <div class="comment item" :data-id="commentId">
    <div class="wrapper-comment-edit">
      <button
        @click="$parent.editPost"
        v-if="
          comment.UserId == $store.state.user.id ||
          $store.state.user.admin == true
        "
        class="update-comment"
      >
        <img src="@/assets/setting.svg" alt="update post" />
      </button>
      <button
        @click="$parent.deletePost"
        v-if="
          comment.UserId == $store.state.user.id ||
          $store.state.user.admin == true
        "
        class="delete-comment"
      >
        <img src="@/assets/bin.svg" alt="delete post" />
        <!-- {{
            post.post.UserId + " " + $store.state.user.id + " " + post.post.id
          }} -->
      </button>
    </div>
    <!-- need to fetch info user for each comments ... -->
    <div class="comment-content item-content">
      <div class="wrapper-comment-user">
        <div class="comment-user">
          <img
            v-if="commentUser.imgUrl"
            :src="$store.state.baseUrl + commentUser.imgUrl"
            alt="user"
          />
          <img
            v-if="!commentUser.imgUrl"
            src="@/assets/Groupomania-user.svg"
            alt="user"
          />
          <h3>{{ commentUser.name + " " + commentUser.lastname }}</h3>
          —
          <div id="date">{{ $parent.postDate(comment.createdAt) }}</div>
        </div>
      </div>

      <h4 class="comment-caption item-caption">
        {{ comment.caption }}
      </h4>
      <div class="wrapper-edit">
        <button @click="$parent.cleanEdit" class="edit-back">Back</button>
        <button @click="$parent.updatePost" class="edit-confirm">
          Confirm
        </button>
        <!-- Maybe add file button but update a post with modify the image is non-sense -->
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  name: "PostTemplate",
  props: ["user", "commentUser", "comment", "commentId"],
  data() {
    return {
      sendCaption: "",
      commentSent: [],
      userLogged: this.user,
    };
  },
  mounted() {
    this.userLogged = this.user;
    console.log(this.commentUser);
  },
};
</script>

<style scoped>
.comment-user {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.comment-user > img {
  width: 35px;
  height: 35px;
}

.comment {
  margin: 0 0 0 15px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 15px;
}

.comment-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 15px;
}

.comment-content > .wrapper-edit {
  margin: 0 0 0 50px;
}

.wrapper-comment-edit {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 15px;
}

.update-comment {
  all: unset;
  color: var(--main-color);
  cursor: pointer;
}

.delete-comment {
  all: unset;
  color: var(--accent-color);
  cursor: pointer;
}

.update-comment > img,
.delete-comment > img {
  width: 20px;
}

.comment-caption {
  margin: 0 0 0 50px;
  width: 100%;
  font-weight: 300;
}

.wrapper-edit {
  margin: 0 0 0 50px;
  display: none;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 15px;
}

.edit .wrapper-edit {
  display: flex;
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
</style>

<style scoped>
@media screen and (max-width: 640px) {
  .comment {
    width: 100%;
    flex-direction: column;
  }

  .wrapper-comment-edit {
    padding: 15px 0 0 0;
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
  }

  .comment-content {
    width: 100%;
  }

  .wrapper-comment-user {
    width: 100%;
  }

  .comment-user {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }

  #date {
    margin: 0 0 10px 0;
    width: 100%;
    text-align: right;
  }

  .comment-caption {
    margin: 0;
  }
}
</style>
