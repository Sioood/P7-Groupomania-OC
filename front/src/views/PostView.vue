<template>
  <div id="post">
    <PostTemplate
      v-for="post in posts"
      :key="post.post.id"
      :post="post"
      :dataId="post.post.id"
    />
  </div>
</template>

<script>
import router from "@/router";
import { mapGetters, mapActions } from "vuex";

import PostTemplate from "@/components/PostTemplate.vue";

export default {
  name: "HomePage",
  components: {
    PostTemplate,
  },
  data() {
    return {};
  },
  created() {
    this.getPosts({
      id: router.currentRoute.query.id,
      userId: null,
      limit: 0,
      comment: false,
      commentLimit: 0,
    });
  },
  computed: {
    ...mapGetters(["posts", "user"]),
  },
  methods: {
    ...mapActions(["getPosts"]),
    logPost() {
      console.log(this.posts);
    },
  },
};
</script>

<style scoped>
#post {
  width: 80%;
}
</style>
