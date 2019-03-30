<template>
  <div>
    <h3>商品评论页面</h3>
    <cmtbox :id="$route.params.id"></cmtbox>
  </div>
</template>

<script>
import cmtbox from "../subcomponents/Comment.vue";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {
    cmtbox
  }
};
</script>

    
<style lang="scss" scoped>
</style>
