<template>
  <div id="pannel">
    <input type="search" name="" id="search" placeholder="🔎 Rechercher" />
    <a href="/me" class="button">Profil</a>
    <h3>Nouveau post</h3>
    <textarea
      v-model="caption"
      name="caption"
      id="textarea"
      cols="30"
      rows="10"
    ></textarea>
    <div class="wrapper-buttons">
      <input type="file" name="file" ref="file" />
      <button @click="createPost()" id="submitPost">Poster</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PannelHome",
  data() {
    return {
      caption: "",
      file: "",
    };
  },
  methods: {
    createPost() {
      const userId = this.$store.state.user.id;
      this.file = this.$refs.file.files[0];
      const form = {
        caption: this.caption,
        imgUrl: this.file,
        UserId: userId,
      };
      console.log(this.file, JSON.stringify(form));

      if (!form.caption || !form.imgUrl) {
        alert("veuillez mettre une description et une image dans votre post.");
        return;
      }
      fetch("http://localhost:3000/api/post/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(form),
      });
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
