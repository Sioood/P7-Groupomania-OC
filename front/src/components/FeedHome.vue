<template>
  <div id="feed">
    <button @click="test()">test</button>
    <PostTemplate
      v-for="post in posts"
      :key="post.post.id"
      :post="post"
      :dataId="post.post.id"
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
  methods: {
    test() {
      const test = this.posts;
      test.splice(0, 1);
      console.log(test);
    },
  },
};
</script>
