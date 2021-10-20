<template>
  <h1>
    mandlebrot set generator
  </h1>

  <div id="container">
    <canvas
      id="canvas"
      :width="canvasWidth"
      :height="canvasHeight"
      @click="onZoom"
    />
    <div id="options">
      max. iterations
      <vue-slider
        v-model="maxIter"
        :width="200"
        :min="50"
        :max="10000"
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
      canvasWidth: 550,
      canvasHeight: 500,
      maxIter: 80,
      boundLeft: -2.0,
      boundRight: 0.47,
      boundDown: -1.12,
      boundUp: 1.12,
    }
  },
  methods: {
    onZoom(event) {
      const zoomFactor = 2;

      const width = this.canvasWidth;
      const height = this.canvasHeight;

      const boundLeft = this.boundLeft;
      const boundRight = this.boundRight;
      const boundDown = this.boundDown;
      const boundUp = this.boundUp;

      let canvas = document.getElementById("canvas");

      let canvasLeft = canvas.offsetLeft + canvas.clientLeft;
      let canvasTop = canvas.offsetTop + canvas.clientTop;
      let mouseX = event.pageX - canvasLeft;
      let mouseY = event.pageY - canvasTop

      let newWidth = Math.abs(boundRight - boundLeft) / zoomFactor;
      let newHeight = Math.abs(boundDown - boundUp) / zoomFactor;

      let mouseXScaled = ((mouseX / (width - 1)) * (boundRight - boundLeft)) + boundLeft;
      let mouseYScaled = ((mouseY / (height - 1)) * (boundUp - boundDown)) + boundDown;

      this.boundLeft = mouseXScaled - (newWidth / 2);
      this.boundRight = mouseXScaled + (newWidth / 2);
      this.boundDown = mouseYScaled - (newHeight / 2);
      this.boundUp = mouseYScaled + (newHeight / 2);

      this.generateMandelbrot();
    },

    generateMandelbrot() {
      const width = this.canvasWidth;
      const height = this.canvasHeight;

      const maxIter = this.maxIter;

      const boundLeft = this.boundLeft;
      const boundRight = this.boundRight;
      const boundDown = this.boundDown;
      const boundUp = this.boundUp;

      let canvas = document.getElementById("canvas");
      let canvasContext = canvas.getContext("2d");
      
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
          } else {
            canvasContext.fillStyle = "rgb(255, " + (iter / (maxIter / 6)) * 255 + ", 0)";
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