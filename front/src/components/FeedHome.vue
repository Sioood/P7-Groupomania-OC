<template>
  <div id="feed">
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
    return {
      savedCaption: "",
    };
  },
  computed: {
    ...mapGetters(["posts"]),
  },
};
</script>
