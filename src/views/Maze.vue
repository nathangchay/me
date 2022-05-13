<template>
  <h1>
    maze generator
  </h1>

  <div id="instructions">
    click an algorithm button to start generating a maze using that algorithm! <br>
    you cannot switch algorithms while one is running - to skip to the end of an animation, toggle it off in the options
  </div>

  <div id="buttons">
    <div
      class="algo-button"
      @click="generateDFS"
    >
      depth-first search
    </div>
    <div
      class="algo-button"
      @click="generateKruskal"
    >
      kruskal's
    </div>
    <div
      class="algo-button"
      @click="generatePrim"
    >
      prim's
    </div>
    <div
      class="algo-button"
      @click="generateAldousBroder"
    >
      aldous-broder
    </div>
    <!--
    <div
      class="algo-button"
      @click="generateWilson"
    >
      wilson's
    </div>
    -->
  </div>

  <div id="outer-container">
    <div id="options-container">
      <div class="option">
        <b>options</b>
      </div>
      <div class="option">
        maze size: <input v-model="rows">x<input v-model="cols">
      </div>
      <div class="option">
        tile size: <input v-model="tileSize">px
      </div>
      <div class="option">
        animation delay: <input v-model="animDelay">ms
      </div>
      <div class="option">
        animation:
        <div
          class="option-button"
          @click="() => { animate = !animate }"
        >
          {{ animate ? "on" : "off" }}
        </div>
      </div>
    </div>
    
    <div id="grid">
      <div
        v-for="row in maze"
        :key="row.id"
        class="row"
      >
        <div
          v-for="tile in row" 
          :key="tile.id"
          :style="{
            'background-color': tile.c == 1 ? 'red' : 'white',
            'height': tileSize + 'px',
            'width': tileSize + 'px',
            'border-right': tile.r == 1 ? 'solid black 2px' : '',
            'border-left': tile.l == 1 ? 'solid black 2px' : '',
            'border-top': tile.u == 1 ? 'solid black 2px' : '',
            'border-bottom': tile.d == 1 ? 'solid black 2px' : '',
          }"
          class="tile"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Maze',
    data() {
      return {
        // Whether a generation animation is running
        running: false,

        // Whether the animate option is selected
        animate: true,

        // Delay (ms) between each frame of animation
        animDelay: 10,

        // Size (px) (each tile will be tileSize x tileSize pixels)
        tileSize: 10,

        // Amount of rows in maze
        rows: 30,

        // Amount of columns in maze
        cols: 30,

        /*
          2D array of maze tiles

          Each tile is an object with the following properties:
          u: whether there is a wall above this tile
          d: whether there is a wall below this tile
          l: whether there is a wall to the left of this tile
          r: whether there is a wall to the right of this tile
          c: whether this tile should be colored (this is used for animation)
        */
        maze: [],
    }
  },
  methods: {
    /*
      Delays the maze animation
    */
    delay() {
      return new Promise(res => setTimeout(res, this.animDelay));
    },

    /*
      Resets the maze to default values
    */
    resetMaze() {
      this.maze = [];

      for (let i = 0; i < this.rows; i++) {
        this.maze.push([]);  

        for (let j = 0; j < this.cols; j++) {
          this.maze[i].push({ u: true, d: true, l: true, r: true, c: false })
        }
      }
    },

    /*
      Removes a wall between two given tiles in the maze
    */
    removeWall(a, b) {
      if (a.row == b.row - 1) {
        this.maze[a.row][a.col].d = false;
        this.maze[b.row][b.col].u = false;
      } else if (a.row == b.row + 1) {
        this.maze[a.row][a.col].u = false;
        this.maze[b.row][b.col].d = false;
      } else if (a.col == b.col - 1) {
        this.maze[a.row][a.col].r = false;
        this.maze[b.row][b.col].l = false;
      } else if (a.col == b.col + 1) {
        this.maze[a.row][a.col].l = false;
        this.maze[b.row][b.col].r = false;
      }
    },

    /*
      Adds a wall between two given tiles in the maze
    */
    addWall(a, b) {
      if (a.row == b.row - 1) {
        this.maze[a.row][a.col].d = true;
        this.maze[b.row][b.col].u = true;
      } else if (a.row == b.row + 1) {
        this.maze[a.row][a.col].u = true;
        this.maze[b.row][b.col].d = true;
      } else if (a.col == b.col - 1) {
        this.maze[a.row][a.col].r = true;
        this.maze[b.row][b.col].l = true;
      } else if (a.col == b.col + 1) {
        this.maze[a.row][a.col].l = true;
        this.maze[b.row][b.col].r = true;
      }
    },

    /*
      Whether a given tile's dimensions are valid (within the boundary of the maze)
    */
    isValidTile(tile) {
      return (
        tile.row >= 0 &&
        tile.col >= 0 &&
        tile.row < this.maze.length &&
        tile.col < this.maze[tile.row].length
      );
    },

    /*
      Returns an array of walls surrounding a given tile
      A wall is represented as an object containing both tiles between which the wall lies
    */
    getNeighboringWalls(tile) {
      let walls = [];

      if (tile.row > 0) {
        walls.push({ a: { row: tile.row, col: tile.col }, b: { row: tile.row - 1, col: tile.col }});
      }

      if (tile.row < this.rows - 1) {
        walls.push({ a: { row: tile.row, col: tile.col }, b: { row: tile.row + 1, col: tile.col }});
      }

      if (tile.col > 0) {
        walls.push({ a: { row: tile.row, col: tile.col }, b: { row: tile.row, col: tile.col - 1 }});
      }

      if (tile.col < this.cols - 1) {
        walls.push({ a: { row: tile.row, col: tile.col }, b: { row: tile.row, col: tile.col + 1 }});
      }

      return walls;
    },

    /*
      Generates the maze using a depth-first search algorithm
    */
    async generateDFS() {
      let stack = [];
      let visited = [];
      let neighbors = [];
      let potNeighbors = [];
      let selected;
      let cur = { row: 0, col: 0 };

      if (this.running) {
        return;
      }

      this.resetMaze();
      this.running = true;

      let row = [];
      for (let i = 0; i < this.rows; i++) {
        row = [];

        for (let j = 0; j < this.cols; j++) {
          row.push(false);
        }

        visited.push(row);
      }
      
      visited[cur.row][cur.col] = true;
      stack.push(cur);

      while (stack.length > 0) {
        cur = stack.pop();
        this.maze[cur.row][cur.col].c = true;

        if (cur.row == undefined) {
          break;
        }

        neighbors = [];

        potNeighbors = [
          { row: cur.row + 1, col: cur.col },
          { row: cur.row - 1, col: cur.col },
          { row: cur.row, col: cur.col + 1 },
          { row: cur.row, col: cur.col - 1 },
        ];

        for (let i = 0; i < 4; i++) {
          if (this.isValidTile(potNeighbors[i]) && !visited[potNeighbors[i].row][potNeighbors[i].col]) {
            neighbors.push(potNeighbors[i]);
          }
        }

        if (neighbors.length > 0) {
          stack.push(cur);

          selected = neighbors[Math.floor(Math.random() * neighbors.length)];

          this.removeWall(cur, selected);
          visited[selected.row][selected.col] = true;
          stack.push(selected);
        }
        
        if (this.animate) {
          await this.delay();
        }
        
        this.maze[cur.row][cur.col].c = false;
      }

      this.running = false;
    },

    /*
      Generates the maze using Kruskal's algorithm
      Adapted from pseudocode at https://en.wikipedia.org/wiki/Kruskal%27s_algorithm
    */
    async generateKruskal() {
      let walls = [];
      let sets = [];
      let cur, curInd, aSet, bSet;

      if (this.running) {
        return;
      }

      this.resetMaze();
      this.running = true;

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          sets.push([{ row: i, col: j }]);

          if (i < this.rows - 1) {
            walls.push({ a: { row: i, col: j }, b: { row: i + 1, col: j }});
          }

          if (j < this.cols - 1) {
            walls.push({ a: { row: i, col: j }, b: { row: i, col: j + 1 }})
          }
        }
      }

      while (sets.length > 1) {
        curInd = Math.floor(Math.random() * walls.length);
        cur = walls[curInd];

        this.maze[cur.a.row][cur.a.col].c = true;
        this.maze[cur.b.row][cur.b.col].c = true;

        aSet = -1;
        bSet = -1;
        for (let i = 0; i < sets.length; i++) {
          for (let j = 0; j < sets[i].length; j++) {
            if (sets[i][j].row == cur.a.row && sets[i][j].col == cur.a.col) {
              aSet = i;
            }

            if (sets[i][j].row == cur.b.row && sets[i][j].col == cur.b.col) {
              bSet = i;
            }
          }

          if (aSet != -1 && bSet != -1) {
              break;
          }
        }

        if (aSet != bSet) {
          this.removeWall(cur.a, cur.b);
          sets[aSet] = sets[aSet].concat(sets[bSet]);
          sets.splice(bSet, 1);
          walls.splice(curInd, 1);
        }

        if (this.animate) {
          await this.delay();
        }

        this.maze[cur.a.row][cur.a.col].c = false;
        this.maze[cur.b.row][cur.b.col].c = false;
      }

      this.running = false;
    },

    /*
      Generates a maze using Prim's algorithm
      Adapted from pseudocode at https://en.wikipedia.org/wiki/Prim%27s_algorithm
    */
    async generatePrim() {
      let curTile = { row: 0, col: 0 };
      let curWall, curWallInd;
      let walls = this.getNeighboringWalls(curTile);
      let visited = [];

      if (this.running) {
        return;
      }

      this.resetMaze();
      this.running = true;

      let row = [];
      for (let i = 0; i < this.rows; i++) {
        row = [];

        for (let j = 0; j < this.cols; j++) {
          row.push(false);
        }

        visited.push(row);
      }

      visited[curTile.row][curTile.col] = true;

      while (walls.length > 0) {
        curWallInd = Math.floor(Math.random() * walls.length);
        curWall = walls[curWallInd];

        this.maze[curWall.a.row][curWall.a.col].c = true;
        this.maze[curWall.b.row][curWall.b.col].c = true;

        if (
          visited[curWall.a.row][curWall.a.col] && !visited[curWall.b.row][curWall.b.col] ||
          !visited[curWall.a.row][curWall.a.col] && visited[curWall.b.row][curWall.b.col]
        ) {
          this.removeWall(curWall.a, curWall.b);

          if (!visited[curWall.b.row][curWall.b.col]) {
            walls = walls.concat(this.getNeighboringWalls(curWall.b));
          } else {
            walls = walls.concat(this.getNeighboringWalls(curWall.a));
          }

          visited[curWall.a.row][curWall.a.col] = true;
          visited[curWall.b.row][curWall.b.col] = true;
        }

        walls.splice(curWallInd, 1);

        if (this.animate) {
          await this.delay();
        }

        this.maze[curWall.a.row][curWall.a.col].c = false;
        this.maze[curWall.b.row][curWall.b.col].c = false;
      }

      this.running = false;
    },

    /*
    I couldn't get this one to work properly :-(

    async generateWilson() {
      let visited = [];
      let path = [];
      let isInPath = [];
      let neighbors = [];
      let potNeighbors = [];
      let cur = { row: Math.floor(Math.random() * this.rows), col: Math.floor(Math.random() * this.cols) };
      let prev;
      let start = { row: Math.floor(Math.random() * this.rows), col: Math.floor(Math.random() * this.cols) };
      let selected;

      this.resetMaze();

      let row = [];
      let row2 = [];
      for (let i = 0; i < this.rows; i++) {
        row = [];
        row2 = [];

        for (let j = 0; j < this.cols; j++) {
          row.push(false);
          row2.push(false);
        }

        visited.push(row);
        isInPath.push(row2);
      }

      visited[start.row][start.col] = true;
      console.log("Setting first maze tile to", start, "visited =", visited[start.row][start.col], "isInPath = ", isInPath[start.row][start.col]);

      path.push(cur);
      isInPath[cur.row][cur.col] = true;
      console.log("Setting start to", cur, "visited =", visited[cur.row][cur.col], "isInPath = ", isInPath[cur.row][cur.col]);

      while (visited.length < (this.rows - 1) * (this.cols - 1)) {
        neighbors = [];

        potNeighbors = [
          { row: cur.row + 1, col: cur.col },
          { row: cur.row - 1, col: cur.col },
          { row: cur.row, col: cur.col + 1 },
          { row: cur.row, col: cur.col - 1 },
        ];

        this.maze[cur.row][cur.col].c = 1;

        for (let i = 0; i < 4; i++) {
          if (this.isValidTile(potNeighbors[i])) {
            neighbors.push(potNeighbors[i]);
          }
        }

        selected = neighbors[Math.floor(Math.random() * neighbors.length)];

        if (this.animate) {
          await this.delay();
        }

        this.maze[cur.row][cur.col].c = 0;

        if (visited[selected.row][selected.col]) {
          console.log("Selected:", selected, "is in visited");
          this.removeWall(cur, selected);

          for (let i = 0; i < path.length; i++) {
            visited[path[i].row][path[i].col] = true;
            isInPath[path[i].row][path[i].col] = false;
          }

          path = [];
          cur = { row: Math.floor(Math.random() * this.rows), col: Math.floor(Math.random() * this.cols) };
        } else if (isInPath[selected.row][selected.col]) {
          console.log("Selected:", selected, "is in path");

          console.log("Getting prev and cur from path:");
          prev = path.pop();
          cur = prev;
          console.log("prev:", prev, "cur:", cur);
          isInPath[cur.row][cur.col] = false;

          console.log("Adding wall between prev and cur");
          this.addWall(prev, cur);

          while (prev.row != selected.row && prev.col != selected.col) {
            prev = cur;
            cur = path.pop();
            isInPath[cur.row][cur.col] = false;

            console.log("Adding wall between prev and cur");
            this.addWall(prev, cur);
          }
        } else {
          console.log("Selected:", selected, "is new");
          this.removeWall(cur, selected);

          cur = selected;

          path.push(cur);
          isInPath[cur.row][cur.col] = true;
          visited[cur.row][cur.col] = false;
        }
      }
    }
    */
    
    /*
      Generates the maze using the Aldous-Broder algorithm
      Adapted from pseudocode at https://en.wikipedia.org/wiki/Maze_generation_algorithm
    */
    async generateAldousBroder() {
      let visited = [];
      let visitedCount = 0;
      let neighbors = [];
      let potNeighbors = [];
      let cur, selected;

      if (this.running) {
        return;
      }

      this.running = true;

      let row = [];
      for (let i = 0; i < this.rows; i++) {
        row = [];

        for (let j = 0; j < this.cols; j++) {
          row.push(false);
        }

        visited.push(row);
      }

      this.resetMaze();

      cur = { row: Math.floor(Math.random() * this.rows), col: Math.floor(Math.random() * this.cols) }
      visited[cur.row][cur.col] = true;
      visitedCount++;

      while (visitedCount < this.rows * this.cols) {
        this.maze[cur.row][cur.col].c = true;

        neighbors = [];

        potNeighbors = [
          { row: cur.row + 1, col: cur.col },
          { row: cur.row - 1, col: cur.col },
          { row: cur.row, col: cur.col + 1 },
          { row: cur.row, col: cur.col - 1 },
        ];

        for (let i = 0; i < 4; i++) {
          if (this.isValidTile(potNeighbors[i])) {
            neighbors.push(potNeighbors[i]);
          }
        }

        selected = neighbors[Math.floor(Math.random() * neighbors.length)];

        if (!visited[selected.row][selected.col]) {
          this.removeWall(cur, selected);
          visited[selected.row][selected.col] = true;
          visitedCount++;
        }

        if (this.animate) {
          await this.delay();
        }

        this.maze[cur.row][cur.col].c = false;
        cur = selected;
      }

      this.running = false;
    }
  }
}
</script>


<style scoped>
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
    text-align: center;
    width: 30px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .tile {
    background-color: white;
    width: 50px;
    height: 50px;
    border: solid 2px white;
  }

  .option {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .algo-button {
    background-color: var(--container);
    padding: 15px;
    margin: 10px 5px;
    border-radius: 15px;
    border: solid transparent 2px;
    cursor: pointer;
    box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
    transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
  }

  .option-button {
    background-color: var(--accent1);
    padding: 5px 10px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 15px;
    border: solid transparent 2px;
    cursor: pointer;
    box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
    transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
  }

  .algo-button:hover, .option-button:hover {
    border-color: var(--text)
  }

  .button-small {
    background-color: var(--container);
    padding: 10px ;
    margin: 10px;
    border-radius: 15px;
    border: solid transparent 2px;
    cursor: pointer;
    box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
    transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
    font-size: 8pt;
    text-align: center;
  }

  #grid {
    border: solid 2px black;
  }

  #buttons {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  #outer-container {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    align-items: flex-start;
  }

  #options-container {
    background-color: var(--container);
    padding: 15px 20px;
    border-radius: 15px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-right: 30px;
    justify-content: flex-start;
    box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
  }

  #instructions {
    margin-bottom: 15px;
  }
</style>