<template>
  <div>
    <h1>featured projects</h1>
    <FeaturedProjectTile />
    <h2>other projects</h2>
  </div>
</template>

<script>
import FeaturedProjectTile from '../components/FeaturedProjectTile.vue';

export default {
  name: 'Projects',
  components: {
    FeaturedProjectTile,
  }
};
</script>

<style>

</style>