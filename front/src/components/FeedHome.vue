<template>
  <div id="feed">
    <div v-if="!posts" class="nothing">
      <h4>Aucun posts</h4>
    </div>
    <PostTemplate
      v-for="post in posts"
      :key="post.post.id"
      :post="post"
      :dataId="post.post.id"
      :linkTo="post.post.id"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import PostTemplate from "@/components/PostTemplate.vue";

export default {
  name: "FeedHome",
  components: {
    PostTemplate,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["posts"]),
  },
};
</script>

<style scoped>
.nothing {
  margin: 50px 0 0 0;
}
</style>
