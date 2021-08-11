<template>
  <div id="container">
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
    curText: ' ',
  }),
  mounted() {
    this.animateIn();
  },
  methods: {
    animateOut() {
      var underscoreShowing = false;
      this.curText += ' ';

      setInterval(() => {
        if (underscoreShowing) {
          this.curText = this.curText.replace(/.$/," ");
          underscoreShowing = false;
        } else {
          this.curText = this.curText.replace(/.$/,"_");
          underscoreShowing = true;
        }
      }, 600);
    },

    animateIn() {
      let i = 0;

      var anim = setInterval(() => {
        this.curText += this.finalText.charAt(i);
        i++;

        if (i >= this.finalText.length) {
          this.animateOut();
          clearInterval(anim);
        }
      }, 75);
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