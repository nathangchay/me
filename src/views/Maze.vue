<template>
  <h1>
    maze generator
  </h1>

  <div id="buttons">
    <div
      id="algo-button"
      @click="generateDFS"
    >
      depth-first search
    </div>
    <div
      id="algo-button"
      @click="generateKruskal"
    >
      kruskal's
    </div>
    <div
      id="algo-button"
      @click="generatePrim"
    >
      prim's
    </div>
    <div
      id="algo-button"
      @click="generateWilson"
    >
      wilson's
    </div>
  </div>

  <div id="options-container">
    <div id="option">
      maze size: <input v-model="rows">x<input v-model="cols">
    </div>
    <div id="option">
      tile size: <input v-model="tileSize">px
    </div>
    <div id="option">
      animation:
      <div
        id="option-button"
        @click="() => { animate = !animate }"
      >
        {{ animate ? "on" : "off" }}
      </div>
    </div>
  </div>
  
  <div id="grid">
    <div
      v-for="row in maze"
      id="row"
      :key="row.id"
    >
      <div
        v-for="tile in row" 
        id="tile"
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
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Maze',
    data() {
      return {
        animate: true,
        tileSize: 10,
        rows: 30,
        cols: 30,
        maze: [],
    }
  },
  methods: {
    delay(ms) {
      return new Promise(res => setTimeout(res, ms));
    },

    resetMaze() {
      this.maze = [];

      for (let i = 0; i < this.rows; i++) {
        this.maze.push([]);  

        for (let j = 0; j < this.cols; j++) {
          this.maze[i].push({ u: 1, d: 1, l: 1, r: 1, c: 0 })
        }
      }
    },

    removeWall(a, b) {
      if (a.row == b.row - 1) {
        this.maze[a.row][a.col].d = 0;
        this.maze[b.row][b.col].u = 0;
      } else if (a.row == b.row + 1) {
        this.maze[a.row][a.col].u = 0;
        this.maze[b.row][b.col].d = 0;
      } else if (a.col == b.col - 1) {
        this.maze[a.row][a.col].r = 0;
        this.maze[b.row][b.col].l = 0;
      } else if (a.col == b.col + 1) {
        this.maze[a.row][a.col].l = 0;
        this.maze[b.row][b.col].r = 0;
      }
    },

    isValidTile(tile) {
      return (
        tile.row >= 0 &&
        tile.col >= 0 &&
        tile.row < this.maze.length &&
        tile.col < this.maze[tile.row].length
      );
    },

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

    async generateDFS() {
      let stack = [];
      let visited = [];
      let neighbors = [];
      let potNeighbors = [];
      let selected;
      let cur = { row: 0, col: 0 };

      this.resetMaze();

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
        this.maze[cur.row][cur.col].c = 1;

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
          await this.delay(10);
        }
        
        this.maze[cur.row][cur.col].c = 0;
      }
    },

    async generateKruskal() {
      let walls = [];
      let sets = [];
      let cur, curInd, aSet, bSet;

      this.resetMaze();

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

        this.maze[cur.a.row][cur.a.col].c = 1;
        this.maze[cur.b.row][cur.b.col].c = 1;

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
          await this.delay(10);
        }

        this.maze[cur.a.row][cur.a.col].c = 0;
        this.maze[cur.b.row][cur.b.col].c = 0;
      }
    },

    async generatePrim() {
      let curTile = { row: 0, col: 0 };
      let curWall, curWallInd;
      let walls = this.getNeighboringWalls(curTile);
      let visited = [];

      this.resetMaze();

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

        this.maze[curWall.a.row][curWall.a.col].c = 1;
        this.maze[curWall.b.row][curWall.b.col].c = 1;

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
          await this.delay(10);
        }

        this.maze[curWall.a.row][curWall.a.col].c = 0;
        this.maze[curWall.b.row][curWall.b.col].c = 0;
      }
    },

    async generateWilson() {
      let visited = [];
      let path = [];
      let isInPath = [];
      let potNeighbors = [];
      let cur = { row: Math.floor(Math.random() * this.rows), col: Math.floor(Math.random() * this.cols) };
      let start = { row: Math.floor(Math.random() * this.rows), col: Math.floor(Math.random() * this.cols) };
      let selected;

      this.resetMaze();

      let row = [];
      for (let i = 0; i < this.rows; i++) {
        row = [];

        for (let j = 0; j < this.cols; j++) {
          row.push(false);
        }

        visited.push(row);
        isInPath.push(row);
      }

      visited[start.row][start.col] = true;
      path.push(cur);
      isInPath[cur.row][cur.col] = true;

      while (visited.length < (this.rows - 1) * (this.cols - 1)) {
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

        if (visited[selected.row][selected.col]) {
          for (let i = 0; i < path.length; i++) {
            visited[path[i].row][path[i].col] = true;
            isInPath[path[i].row][path[i].col] = false;
          }

          path = [];
          cur = { row: Math.floor(Math.random() * this.rows), col: Math.floor(Math.random() * this.cols) };

          continue;
        }
      }
    }
  }
}
</script>


<style scoped>
#row {
  display: flex;
  flex-direction: row;
}

#grid {
  border: solid 2px black;
}

#tile {
  background-color: white;
  width: 50px;
  height: 50px;
  border: solid 2px white;
}

#buttons {
  display: flex;
  align-items: center;
  flex-direction: row;
}

#options-container {
  width: 500px;
  background-color: var(--container);
  padding: 10px 20px;
  border-radius: 15px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 10px;
  justify-content: flex-start;
  box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
}

#option {
  display: flex;
  align-items: center;
  flex-direction: row;
}

#algo-button {
  background-color: var(--container);
  padding: 15px;
  margin: 10px 5px;
  border-radius: 15px;
  border: solid transparent 2px;
  cursor: pointer;
  box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
  transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
}

#algo-button:hover {
  border-color: var(--text)
}

#option-button {
  background-color: var(--accent1);
  padding: 5px 10px;
  margin: 5px;
  border-radius: 15px;
  border: solid transparent 2px;
  cursor: pointer;
  box-shadow: 0 3px 1px rgb(0 0 0 / 0.2);
  transition: border-color 200ms ease-in-out, background-color 300ms ease-in-out;
}

#option-button:hover {
  border-color: var(--text)
}

#button-small {
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
  margin: 5px;
  text-align: center;
  width: 30px;
}
</style>