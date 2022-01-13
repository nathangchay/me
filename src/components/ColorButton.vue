<template>
  <div id="container">
    <div id="row">
      <div
        id="button"
        @click="changeColor"
      >
        change color scheme
      </div>
      <div
        id="button-small"
        :style="{ visibility: defaultVisible ? 'visible' : 'hidden'}"
        @click="defaultColor"
      >
        default
      </div>
    </div>
    
    <a
      id="button-info"
      href="http://colormind.io/"
      :style="{ visibility: defaultVisible ? 'visible' : 'hidden'}"
    >
      powered by colormind.io
    </a>
  </div>
</template>

<script>
export default {
  name: 'ColorButton',
  data: () => ({
    defaultVisible: false,
  }),
  methods: {
    setColor(cssVar, palette, i) {
        document.documentElement.style.setProperty(
          cssVar,
          'rgb(' + palette[i][0] +
            ', ' + palette[i][1] +
            ', ' + palette[i][2] + ')',
        );
    },

    changeColor() {
      var self = this;
      var url = "http://colormind.io/api/";
      var data = {model : "default"};
      var http = new XMLHttpRequest();

      function luma(arr) {
        return 0.2126 * arr[0] + 0.7152 * arr[1] + 0.0722 * arr[2];
      }

      http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
		      var palette = JSON.parse(http.responseText).result;

          palette.sort(function(a, b) {
            var lumaA = luma(a);
            var lumaB = luma(b);

            return lumaA - lumaB;
          })

          self.setColor('--background', palette, 0);
          self.setColor('--container', palette, 1);
          self.setColor('--accent1', palette, 2);
          self.setColor('--accent2', palette, 3);
          self.setColor('--text', palette, 4);
	      }
      }

      http.open("POST", url, true);
      http.send(JSON.stringify(data));

      this.defaultVisible = true;
    },

    defaultColor() {
      let palette = [
        [30, 30, 30],
        [50, 50, 50],
        [70, 70, 70],
        [150, 150, 150],
        [255, 255, 255],
      ]
    
      this.setColor('--background', palette, 0);
      this.setColor('--container', palette, 1);
      this.setColor('--accent1', palette, 2);
      this.setColor('--accent2', palette, 3);
      this.setColor('--text', palette, 4);

      this.defaultVisible = false;
    }
  }
}
</script>

<style scoped>
#container {
  position: absolute;
  bottom: 30px;
  left: 30px;
  display: flex;
  flex-direction: column-reverse;
}

#row {
  display: flex;
  flex-direction: row;
}

#button {
  background-color: var(--container);
  padding: 15px;
  border-radius: 15px;
  border: solid transparent 2px;
  cursor: pointer;
  box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
  transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
}

#button:hover {
  border-color: var(--text)
}

#button-small {
  visibility: hidden;
  align-self: center;
  background-color: var(--container);
  padding: 10px;
  margin-left: 15px;
  border-radius: 15px;
  font-size: 9pt;
  border: solid transparent 2px;
  cursor: pointer;
  box-shadow: 0 2px 1px rgb(0 0 0 / 0.2);
  transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
}

#button-small:hover {
  border-color: var(--text)
}

#button-info {
  margin-bottom: 10px;
  font-size: 8pt;
  text-decoration: none;
  color: var(--text);
  border-radius: 15px;
  opacity: 0.5;
}
</style>