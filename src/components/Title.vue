<template>
  <div>
    <p id="title">
      {{ curText }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Title',
  data: () => ({
    finalText: 'nate world',
    curText: 'a',
  }),
  mounted() {
    for (var i = 0; i < finalText.length; i++) {
      setTimeout(() => {
        this.curText += finalText.charAt(i);
      }, 200)
    }
  },
};


</script>

<style scoped>
  #title {
    font-size: 60pt;
    font-weight: bold;
  }
</style>