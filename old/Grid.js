class Grid{
    constructor(rows, cols){
        this.grid = [ [], [], [], [] ];
        this.emptyTiles = [];
        this.newPossibilities = [2,4];
  
        // Inizializzo la grid con blocchi "Zero" e metto le posizioni in emptyTiles
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                let tile = new Tile(i, j, 0);
                this.grid[i].push(tile);
                this.emptyTiles.push(tile);
            }
        }
    }
  
    // newGame() {
  
    // }
  
    // Prendo dalla griglia un Tile "Zero" quindi vuoto
    // Forse basterebbe mettere qui un check empty tiles
    pickEmpty(){
        let index = floor(random(0, this.emptyTiles.length));
        let tile = this.emptyTiles[index];
        this.emptyTiles = this.emptyTiles.filter(item => item !== tile); //rimuovo l'elemento
        
        return tile;
    }
  
    /**
     * Pushes a random tile onto the grid
     */
    pushRandom(){
        let tile = this.pickEmpty();
        let x = (tile.sprite.x-100)/100; 
        let y = (tile.sprite.y-320)/100;
        let value = Math.floor(Math.random() * 2 + 1) * 2; // can be 2 or 4
  
        // set the value of the block
        this.grid[x][y].value = value;
  
        return new Tile(x, y, value);
    }
  
    /**
     * Function to compact an array moving all the zeros to the beginning or the end
     * @param {object} direction Direction towards we are moving
     * @param {array} arr The array representing a column or a row
     * @returns The modified array
     */
    compact(arr, j) {
        // levo tutti gli zeri
        let toadd = arr.length;
        let tmp = arr.filter(item => item.value!=0);
        
        // li riaggiungo all'inizio o alla fine
        toadd -= tmp.length;
        
        // right: tutti gli zeri a sinistra
        for (let i=0; i<toadd; i++){
            tmp.unshift(new Tile(j, i, 0));
        }
        return tmp;
    }
    
    /**
     * Function to transpose the grid
     */
    transpose() {
        const rows = this.grid.length, cols = newGrid[0].length;
        const grid = [];
        for (let j = 0; j < cols; j++) {
          grid[j] = Array(rows);
        }
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            grid[j][i] = newGrid[i][j];
          }
        }
        this.grid = newGrid;
    }
  
    reverse() {
        let newGrid = [[], [], [], []];
  
        for (let i=0; i<cols; i++) {
            newGrid[i] = this.grid[i].reverse();
        }
  
        this.grid = newGrid;
    }
  
    
    move(scoreUpdate){
        let i,j;
        let newGrid = [[], [], [], []];
        
        /* === DOWN === */
        for (let col=0; col<cols; col++){           // [0, 2, 0, 2]
            // compatto gli zeri per colonne
            let newCol = this.compact(this.grid[col], col);
            
            for (j=rows-1; j>=0; j--) { 
                // check not to go out of borders
                if (j!=0) {
                    if (newCol[j-1].value == 0)
                        break;  // might be a problem, but if we find a 0 then we're done
  
                    if (newCol[j].value == newCol[j-1].value) {
                        // do the sum
                        newCol[j].value *= 2;
                        scoreUpdate(newCol[j].value);
                        
                        // remove the old element
                        newCol.splice(j-1, 1);
                        
                        // shift all the array forward adjustind indexes
                        newCol.unshift(new Tile(col, -1, 0));
                    }
                }
            }
  
            // fix indexes
            for (let k=0; k<rows; k++) {
                newCol[k].y = k;
            }
            
            newGrid[col] = newCol;
        }
  
        this.grid.length = 0;
        this.grid = newGrid;
    }
  
  
    /**
     * Cleans up the board by fixing coordinates and updating empty tiles
     */
    update() {
        this.emptyTiles.length = 0;
  
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                // update empty tiles
                this.grid[i][j].update(i, j);
                
                if (this.grid[i][j].value == 0) {
                    this.emptyTiles.push(this.grid[i][j]);
                }
            }
        }
    }
  
    /**
     * Draws the board calling the show() function for each tile
     */
    show(){
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                // draws every tile
                grid.grid[i][j].show();
            }
        }
    }
  }