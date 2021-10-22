<template>
  <div>
    <h1>featured projects</h1>
    <div id="row">
      <FeaturedProjectTile
        title="project1"
        desc=" this is the description of the project. i made this because i was really bored. it's alright i guess. "
        lang="vue, css"
        date="aug. 2021"
        link="/"
      />
      <FeaturedProjectTile
        title="project1"
        desc=" this is the description of the project. i made this because i was really bored. it's alright i guess. "
        lang="vue, css"
        date="aug. 2021"
        link="/"
      />
    </div>
    <h2>other projects</h2>
    <div id="row">
      <ProjectTile
        title="mandelbrot"
        desc="draw a mandlebrot set"
        lang="vue, css"
        date="aug. 2021"
        link="/mandelbrot"
      />
      <ProjectTile
        title="project1"
        desc=" this is the description of the project. i made this because i was really bored. it's alright i guess. "
        lang="vue, css"
        date="aug. 2021"
        link="/"
      />
      <ProjectTile
        title="project1"
        desc=" this is the description of the project. i made this because i was really bored. it's alright i guess. "
        lang="vue, css"
        date="aug. 2021"
        link="/"
      />
    </div>
  </div>
</template>

<script>
import FeaturedProjectTile from '../components/FeaturedProjectTile.vue';
import ProjectTile from '../components/ProjectTile.vue';

export default {
  name: 'Projects',
  components: {
    FeaturedProjectTile,
    ProjectTile,
  }
};
</script>

<style scoped>
#row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>