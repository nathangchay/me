<template>
  <div id="title">
    {{ curText }}
    <div id="underscore">
      {{ underscore }}
    </div>
  </div>
</template>

<script>
/**
 * Title text with typing animation.
 */
export default {
  name: 'Title',

  data: () => ({
    finalText: ['hi! i\'m nate'],
    curText: ' ',
    underscore: '_',
  }),

  mounted() {
    this.animateText(0, false);
    this.animateUnderscore();
  },

  methods: {
    /**
     * Starts the title animation.
     */
    animateText(i, loop) {
      let j = 0;

      let textNext = this.finalText[i];

      var textAnim = setInterval(() => {
        this.curText += textNext.charAt(j);
        j++;

        if (j >= textNext.length) {
          clearInterval(textAnim);

          if (i < this.finalText.length - 1 || loop) {
            setTimeout(() => {
              var eraseAnim = setInterval(() => {
                this.curText = this.curText.substr(0, this.curText.length - 1);

                if (this.curText.length == 0) {
                  clearInterval(eraseAnim);

                  setTimeout(() => {
                    if (i + 1 < this.finalText.length) {
                      this.animateText(i + 1, loop);
                    } else {
                      this.animateText(0, loop);
                    }
                  }, 1000)
                }
              }, 50);
            }, 2000);
          }
        }
      }, 80);
    },

    /**
     * Starts the underscore animation.
     */
    animateUnderscore() {
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
  #title {
    align-self: center;
    height: 10%;
    position: relative;
    font-size: 60pt;
    font-weight: bold;
    margin: 50px;
  }

  #underscore {
    position: absolute;
    right: 0px;
    top: 0;
    width: 0px;
    font-size: 60pt;
    font-weight: bold;
  }
</style>