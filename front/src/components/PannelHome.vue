<template>
  <div id="pannel">
    <input type="search" name="" id="search" placeholder="🔎 Rechercher" />
    <a :href="url" class="button">Profil</a>
    <h3>Nouveau post</h3>
    <textarea
      v-model="caption"
      name="caption"
      id="textarea"
      cols="30"
      rows="10"
    ></textarea>
    <div class="wrapper-buttons">
      <input type="file" name="file" ref="file" accept="image/*" />
      <button @click="createPost()" id="submitPost">Poster</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PannelHome",
  props: ["url"],
  data() {
    return {
      caption: "",
      file: "",
    };
  },
  computed: {
    ...mapGetters(["posts", "user"]),
  },
  methods: {
    createPost() {
      const userId = this.$store.state.user.id;
      this.file = this.$refs.file.files[0];

      // try new FormData()

      let form = new FormData();

      form.append("caption", this.caption);
      form.append("file", this.file);
      form.append("UserId", userId);

      if (!this.caption && !this.$refs.file.files[0]) {
        alert("veuillez ne pas envoyer un post vide");
        return;
      }
      fetch(`${this.$store.state.baseUrl}/api/post/create`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: form,
      })
        .then((response) => response.json())
        .then((post) => {
          let formPost = {
            post: post,
            comments: [],
            user: this.user,
          };

          this.posts.push(formPost);

          this.$parent.getPosts({
            id: null,
            userId: null,
            limit: this.$parent.limit[0],
            comment: false,
            commentLimit: 1,
          });
        });

      this.caption = "";
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 35px 0 0 0;
  width: 90%;
  text-align: left;
}

#search {
  margin: 15px 0 0 0;
  width: 90%;
  border-radius: 500px;
}

.button {
  all: unset;
  padding: 15px 30px 15px 30px;
  background: var(--third-color);
  color: var(--main-color);
  border-radius: 500px;
  font-weight: 600;
  cursor: pointer;
}

#textarea {
  all: unset;
  padding: 5%;
  width: 80%;
  background: var(--third-color);
  border-radius: 5px;
  text-align: left;
}

.wrapper-buttons {
  text-align: center;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 25px;
}

input[type="file"] {
  padding: 0;
  height: 100%;
  width: 50%;
  background: transparent;
}

input[type="file"]::-webkit-file-upload-button {
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

/* #file {
  padding: 15px 30px 15px 30px;
  background: var(--main-color);
  color: var(--smooth-color);
  border-radius: 500px;
} */

/* #file-upload-button {
  padding: 15px 30px 15px 30px;
  background: var(--main-color);
  color: var(--smooth-color);
  border-radius: 500px;
} */

#submitPost {
  all: unset;
  height: 30%;
  padding: 15px 30px 15px 30px;
  background: var(--accent-color);
  color: var(--smooth-color);
  border-radius: 500px;
  font-weight: 600;
  cursor: pointer;
}
</style>

<style scoped>
@media screen and (max-width: 640px) {
  #search {
    padding: 10px 15px 10px 15px;
  }

  .button {
    padding: 10px 15px 10px 15px;
  }

  h3 {
    margin: 15px 0 0 0;
  }

  .wrapper-buttons {
    flex-direction: column;
    align-items: center;
  }

  input[type="file"] {
    width: 90%;
    font-size: 16px;
  }

  input[type="file"]::-webkit-file-upload-button {
    padding: 10px 5px 10px 5px;
  }

  #submitPost {
    width: 90%;
    padding: 10px 5px 10px 5px;
  }
}
</style>
