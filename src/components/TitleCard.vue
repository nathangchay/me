<template>
  <div class="container">
    <div id="title">
      i'm <b>nate</b>, a software developer from saskatchewan, canada
    </div>
    <br>
    <div>
      this site hosts some of my smaller web-based projects!
    </div>
  </div>
</template>

<script>
  /**
   * Info card with name, description, photo, and social media links.
   */
  export default {
    name: 'TitleCard',
  };
</script>

<style scoped>
  .container {
    position: relative;
    width: 600px;
    display: flex;
    flex-direction: column;
    padding: 30px;
    border-radius: 10px;
    transform: perspective(800px);
  }

  #title {
    align-self: center;
    flex: 1;
    justify-self: flex-end;
    font-size: 20px;
  }
</style>
