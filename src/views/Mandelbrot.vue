<template>
  <h1>
    mandlebrot set generator
  </h1>

  <div class="container">
    <canvas
      id="canvas"
      :width="canvasWidth"
      :height="canvasHeight"
      @click="onZoomIn"
    />
    <div
      class="button-small"
      @click="onZoomOut"
    >
      <img
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
        <div class="options-item">
          <b> options </b>
        </div>
        
        <div class="options-item">
          max. iterations: 
          <input v-model="maxIter">
        </div>
        <div class="options-item">
          zoom factor:
          <input
            v-model="zoomFactor"
            style="margin-right: 5px"
          >
          x
        </div>
        <div class="options-item">
          <div
            class="button-slim"
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
    class="button"
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

      // Width and height of canvas where mandelbrot is drawn
      canvasWidth: 550,
      canvasHeight: 500,

      // Maximum iterations for the mandelbrot drawing algorithm
      maxIter: 80,

      // Multipler amount to zoom in (constrict bounds) when user clicks the canvas 
      zoomFactor: 1.5,

      // Current zoom level
      zoomLevel: 1,

      // Complex number bounds of the drawing
      boundLeft: -2.0,
      boundRight: 0.47,
      boundDown: -1.12,
      boundUp: 1.12,

      // Color gradient to use for drawing
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
    // Generate initial mandelbrot on page load
    this.generateMandelbrot();
  },
  methods: {
    /*
      Zooms into the mandelbrot based on where on the canvas the user clicks
    */
    onZoomIn(event) {
      const zoomFactor = this.zoomFactor;

      const pixelWidth = this.canvasWidth;
      const pixelHeight = this.canvasHeight;

      const boundLeft = this.boundLeft;
      const boundRight = this.boundRight;
      const boundDown = this.boundDown;
      const boundUp = this.boundUp;

      let canvas = document.getElementById("canvas");

      // Calculating mouse position
      let canvasLeft = canvas.offsetLeft + canvas.clientLeft;
      let canvasTop = canvas.offsetTop + canvas.clientTop;
      let mouseX = event.pageX - canvasLeft;
      let mouseY = event.pageY - canvasTop;

      // Calculating new dimensions (in terms of complex numbers) by applying zoom factor
      let oldWidth = Math.abs(boundRight - boundLeft);
      let oldHeight = Math.abs(boundDown - boundUp);
      let newWidth = oldWidth / zoomFactor;
      let newHeight = oldHeight / zoomFactor;

      // Calculating relative mouse position (in terms of complex numbers)
      let mouseXScaled = ((mouseX / (pixelWidth - 1)) * oldWidth) + boundLeft;
      let mouseYScaled = ((mouseY / (pixelHeight - 1)) * oldHeight) + boundDown;

      // Calculating new complex number bounds
      this.boundLeft = mouseXScaled - (newWidth / 2);
      this.boundRight = mouseXScaled + (newWidth / 2);
      this.boundDown = mouseYScaled - (newHeight / 2);
      this.boundUp = mouseYScaled + (newHeight / 2);

      this.zoomLevel *= zoomFactor;

      this.generateMandelbrot();
    },

    /*
      Zooms out of the mandelbrot in the center of the drawing
    */
    onZoomOut() {
      const zoomFactor = this.zoomFactor;

      const boundLeft = this.boundLeft;
      const boundRight = this.boundRight;
      const boundDown = this.boundDown;
      const boundUp = this.boundUp;

      // Calculating new dimensions (in terms of complex numbers) by applying zoom factor
      let oldWidth = Math.abs(boundRight - boundLeft);
      let oldHeight = Math.abs(boundDown - boundUp);
      let newWidth = oldWidth * zoomFactor;
      let newHeight = oldHeight * zoomFactor;

      // Calculating new complex number bounds
      this.boundLeft = boundLeft - ((newWidth - oldWidth) / 2);
      this.boundRight = boundRight + ((newWidth - oldWidth) / 2);
      this.boundDown = boundDown - ((newHeight - oldHeight) / 2);
      this.boundUp = boundUp + ((newHeight - oldHeight) / 2);

      this.zoomLevel /= zoomFactor;

      this.generateMandelbrot();
    },

    /*
      Draws the mandelbrot image given 4 complex number bounds (stored in the data of this component)
      Generation algorithm and coloring algorithm both adapted from algorithms at https://en.wikipedia.org/wiki/Plotting_algorithms_for_the_Mandelbrot_set
    */
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
      
      let xScaled, yScaled, x, x2, y, y2, w, iter, color;

      for (let xPixel = 0; xPixel < width; xPixel++) {
        for (let yPixel = 0; yPixel < height; yPixel++) {
          xScaled = ((xPixel / (width - 1)) * (boundRight - boundLeft)) + boundLeft;
          yScaled = ((yPixel / (height - 1)) * (boundUp - boundDown)) + boundDown;
          x = 0, x2 = 0;
          y = 0, y2 = 0;
          w = 0;
          iter = 0;

          while (x * x + y * y <= 4 && iter < maxIter) {
            x = x2 - y2 + xScaled;
            y = w - x2 - y2 + yScaled;
            x2 = x * x;
            y2 = y * y;
            w = (x + y) * (x + y);

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

    /*
      Resets values to their default
    */
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
  canvas {
    background-color: white;
    border-radius: 15px;
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

  img {
    width: 30px;
    height: 30px;
  }

  .container {
    background-color: var(--container);
    display: flex;
    box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
    border-radius: 15px;
    padding: 15px;
    margin-bottom: 15px;
  }

  .button {
    background-color: var(--container);
    padding: 15px;
    border-radius: 15px;
    border: solid transparent 2px;
    cursor: pointer;
    box-shadow: 0 4px 1px rgb(0 0 0 / 0.2);
    transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
  }

  .button:active {
    transform: translateY(2px);
    box-shadow: 0 2px 1px rgb(0 0 0 / 0.2);
  }

  .button-slim {
    background-color: var(--accent1);
    padding: 7px 15px;
    width: 100%;
    border-radius: 15px;
    border: solid transparent 2px;
    cursor: pointer;
    box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
    transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
  }

  .button-small {
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

  .button:hover, .button-slim:hover, .button-small:hover {
    border-color: var(--text)
  }
  
  .options-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
  }

  #sidebar {
    margin-left: 15px;
    width: 200px;
    display: flex;
    flex-direction: column;
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

  #instructions {
    text-align: left;
  }
</style>