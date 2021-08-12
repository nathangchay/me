<template>
  <div id="container">
    <div id="title">
      {{ curText }}
    </div>
    <div id="underscore">
      {{ underscore }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  data: () => ({
    finalText: 'nate world',
    curText: ' ',
    underscore: '_',
  }),
  mounted() {
    this.animateIn();
  },
  methods: {
    animateIn() {
      let i = 0;

      var textAnim = setInterval(() => {
        this.curText += this.finalText.charAt(i);
        i++;

        if (i >= this.finalText.length) {
          clearInterval(textAnim);
        }
      }, 75);

      setInterval(() => {
        if (this.underscore == '_') {
          this.underscore = '';
        } else {
          this.underscore = '_';
        }
      }, 500);
    }
  },
};


</script>

<style scoped>
  #container {
    min-width: 30%;
    display: flex;
    flex-direction: row;
    margin: 50px;
  }

  #title {
    font-size: 60pt;
    font-weight: bold;
  }

  #underscore {
    font-size: 60pt;
    font-weight: bold;
  }
</style>