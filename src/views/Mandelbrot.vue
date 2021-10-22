<template>
  <h1>
    mandlebrot set generator
  </h1>
  <h5>
    click anywhere to zoom in!
  </h5>

  <div id="container">
    <canvas
      id="canvas"
      :width="canvasWidth"
      :height="canvasHeight"
      @click="onZoom"
    />
    <div id="sidebar">
      <div id="options">
        <div id="options-item">
          max. iterations: 
          <input v-model="maxIter">
        </div>
        <div id="options-item">
          zoom factor:
          <input
            v-model="zoomFactor"
            style="margin-right: 5px"
          >
          x
        </div>
      </div>
      <div id="info">
        left bound: {{ boundLeft }} <br>
        right bound: {{ boundRight }} <br>
        upper bound: {{ boundUp }} <br>
        lower bound: {{ boundDown }} <br>
      </div>
    </div>
  </div>

  <div
    id="button"
    @click="generateMandelbrot"
  >
    {{ generateButtonText }}
  </div>
</template>

<script>
export default {
  name: 'Mandelbrot',
  data() {
    return {
      generateButtonText: "re-generate",
      canvasWidth: 550,
      canvasHeight: 500,
      maxIter: 80,
      zoomFactor: 1.5,
      boundLeft: -2.0,
      boundRight: 0.47,
      boundDown: -1.12,
      boundUp: 1.12,
      gradient: [
        [66, 30, 15],
        [25, 7, 26],
        [9, 1, 47],
        [4, 4, 73],
        [0, 7, 100],
        [12, 44, 138],
        [24, 82, 177],
        [57, 125, 209],
        [134, 181, 229],
        [211, 236, 248],
        [241, 233, 191],
        [248, 201, 95],
        [255, 170, 0],
        [204, 128, 0],
        [153, 87, 0],
        [106, 52, 3],
      ],
    }
  },
  mounted() {
    this.generateMandelbrot();
  },
  methods: {
    onZoom(event) {
      const zoomFactor = this.zoomFactor;

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

      const gradient = this.gradient;

      let canvas = document.getElementById("canvas");
      let canvasContext = canvas.getContext("2d");
      
      let xScaled, yScaled, x, y, iter, temp, color;

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
            color = gradient[iter % gradient.length];

            canvasContext.fillStyle = "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
          }

          canvasContext.fillRect(xPixel, yPixel, 1, 1);
        }
      }
    }
  },
};
</script>

<style scoped>
  #container {
    background-color: var(--container);
    display: flex;
    box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
    border-radius: 15px;
    padding: 15px;
    margin-bottom: 15px;
  }

  #sidebar {
    margin-left: 15px;
    width: 200px;
    display: flex;
    flex-direction: column;
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

  #info {
    font-size: 7pt;
    opacity: 0.5;
    margin-top: auto;
    align-self: flex-start;
    text-align: left;
  }

  #options-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
  }

  input {
    font-size: inherit;
    font-family: inherit;
    color: inherit;
    background-color: var(--accent1);
    border: none;
    border-radius: 15px;
    width: 0px;
    flex: 1;
    padding: 5px 12px;
    margin-left: 10px;
    text-align: center;
  }
</style>