<template>
  <h1>
    mandlebrot set generator
  </h1>

  <div id="container">
    <canvas
      id="canvas"
      :width="canvasWidth"
      :height="canvasHeight"
      @click="onZoomIn"
    />
    <div
      id="button-small"
      @click="onZoomOut"
    >
      <img
        id="icon"
        src="../assets/zoom-out.png"
      >
    </div>
    <div id="sidebar">
      <div id="instructions">
        <b> instructions </b> <br> <br>
        click anywhere to zoom in! <br> <br>
        try increasing the max. iterations to get better results at higher zoom levels
      </div>
      <div id="options">
        <div id="options-item">
          <b> options </b>
        </div>
        
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
        <div id="options-item">
          <div
            id="button-slim"
            @click="resetToDefault"
          >
            reset to default
          </div>
        </div>
      </div>
      <div id="info">
        zoom level: {{ zoomLevel }} x <br>
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
      zoomLevel: 1,
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
    onZoomIn(event) {
      const zoomFactor = this.zoomFactor;

      const pixelWidth = this.canvasWidth;
      const pixelHeight = this.canvasHeight;

      const boundLeft = this.boundLeft;
      const boundRight = this.boundRight;
      const boundDown = this.boundDown;
      const boundUp = this.boundUp;

      let canvas = document.getElementById("canvas");

      let canvasLeft = canvas.offsetLeft + canvas.clientLeft;
      let canvasTop = canvas.offsetTop + canvas.clientTop;
      let mouseX = event.pageX - canvasLeft;
      let mouseY = event.pageY - canvasTop

      let oldWidth = Math.abs(boundRight - boundLeft);
      let oldHeight = Math.abs(boundDown - boundUp)
      let newWidth = oldWidth / zoomFactor;
      let newHeight = oldHeight / zoomFactor;

      let mouseXScaled = ((mouseX / (pixelWidth - 1)) * oldWidth) + boundLeft;
      let mouseYScaled = ((mouseY / (pixelHeight - 1)) * oldHeight) + boundDown;

      this.boundLeft = mouseXScaled - (newWidth / 2);
      this.boundRight = mouseXScaled + (newWidth / 2);
      this.boundDown = mouseYScaled - (newHeight / 2);
      this.boundUp = mouseYScaled + (newHeight / 2);

      this.zoomLevel *= zoomFactor;

      this.generateMandelbrot();
    },

    onZoomOut() {
      const zoomFactor = this.zoomFactor;

      const boundLeft = this.boundLeft;
      const boundRight = this.boundRight;
      const boundDown = this.boundDown;
      const boundUp = this.boundUp;

      let oldWidth = Math.abs(boundRight - boundLeft);
      let oldHeight = Math.abs(boundDown - boundUp);
      let newWidth = oldWidth * zoomFactor;
      let newHeight = oldHeight * zoomFactor;

      this.boundLeft = boundLeft - ((newWidth - oldWidth) / 2);
      this.boundRight = boundRight + ((newWidth - oldWidth) / 2);
      this.boundDown = boundDown - ((newHeight - oldHeight) / 2);
      this.boundUp = boundUp + ((newHeight - oldHeight) / 2);

      this.zoomLevel /= zoomFactor;

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
    },

    resetToDefault() {
      this.maxIter = 80;
      this.zoomFactor = 1.5;
      this.boundLeft = -2.0;
      this.boundRight = 0.47;
      this.boundUp = 1.12;
      this.boundDown = -1.12;

      this.generateMandelbrot();
    },
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
    box-shadow: 0 4px 1px rgb(0 0 0 / 0.2);
    transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
  }

  #button:hover {
    border-color: var(--text)
  }

  #button:active {
    transform: translateY(2px);
    box-shadow: 0 2px 1px rgb(0 0 0 / 0.2);
  }

  #button-slim {
    background-color: var(--accent1);
    padding: 7px 15px;
    width: 100%;
    border-radius: 15px;
    border: solid transparent 2px;
    cursor: pointer;
    box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
    transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
  }

  #button-slim:hover {
    border-color: var(--text)
  }

  #button-small {
    position: absolute;
    background-color: var(--accent1);
    margin-left: 10px;
    margin-top: 10px;
    padding: 5px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    border: solid transparent 2px;
    cursor: pointer;
    box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
    transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #button-small:hover {
    border-color: var(--text)
  }

  #icon {
    width: 30px;
    height: 30px;
  }

  #info {
    font-size: 7pt;
    opacity: 0.5;
    margin-top: auto;
    align-self: flex-start;
    text-align: left;
  }

  #options {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
  }

  #options-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
  }

  #instructions {
    text-align: left;
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