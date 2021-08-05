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
    curText: ' ',
  }),
  mounted() {
    this.animateIn();
  },
  methods: {
    animateIn() {
      let i = 0;

      var anim = setInterval(() => {
        this.curText += this.finalText.charAt(i);
        i++;

        if (i >= this.finalText.length) {
          clearInterval(anim);
        }
      }, 50);
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