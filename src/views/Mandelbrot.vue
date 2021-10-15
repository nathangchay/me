<template>
  <h1>
    mandlebrot set generator
  </h1>

  <div id="container">
    <canvas
      id="canvas"
      width="550"
      height="500"
    />
    <div id="options">
      max. iterations
      <vue-slider
        v-model="maxIter"
        :width="200"
        :max="200"
      />
    </div>
  </div>

  <div
    id="button"
    @click="generateMandelbrot"
  >
    generate
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css'

export default {
  name: 'Mandelbrot',
  components: {
    VueSlider,
  },
  data() {
    return {
      maxIter: 80,
    }
  },
  methods: {
    generateMandelbrot() {
      const maxIter = this.maxIter;
      const width = 550;
      const height = 500;

      const boundLeft = -2.0;
      const boundRight = 0.47;
      const boundDown = -1.12;
      const boundUp = 1.12;

      let canvasContext = document.getElementById("canvas").getContext("2d");
      let xScaled, yScaled, x, y, iter, temp;

      for (let xPixel = 0; xPixel < width; xPixel++) {
        for (let yPixel = 0; yPixel < height; yPixel++) {
          xScaled = ((xPixel / (width - 1)) * (boundRight - boundLeft)) + boundLeft;
          yScaled = ((yPixel / (height - 1)) * (boundUp - boundDown)) + boundDown;
          x = 0;
          y = 0;
          iter = 0;

          while (x * x + y * y <= 4 && iter < maxIter) {
            temp = x * x - y * y + xScaled;
            y = 2 * x * y + yScaled;
            x = temp;

            iter++;
          }

          if (iter == maxIter) {
            canvasContext.fillStyle = "rgb(0, 0, 0)";
          } else if (iter < (maxIter / 5)) {
            canvasContext.fillStyle = "rgb(255, " + (iter / (maxIter / 6)) * 255 + ", 0)";
          } else {
            canvasContext.fillStyle = "rgb(255, 0, 0)";
          }

          canvasContext.fillRect(xPixel, yPixel, 1, 1);
        }
      }
    }
  }
};
</script>

<style scoped>
  #container {
    background-color: var(--container);
    display: flex;
    box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
    border-radius: 15px;
    padding: 10px;
    margin-bottom: 15px;
  }

  #options {
    margin-left: 15px;
  }

  #canvas {
    background-color: white;
    
    border-radius: 15px;
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
</style>