function reducer(state, action){

  switch(action.type) {
    case 'PAUSE_CYCLE' : {
      const { interval } = action;
      return {
        ...state, interval
      }
    }
    case 'START_CYCLE' : {
      const {interval} = action
      console.log(state)
      return {
        ...state,
        interval
      }
    }
    case 'SELECT_CELL' : {
      const {cells} = state;
      const {x, y} = action;
       
       let updateCells = cells.map((row, i) => {
        return row.map((val, j) => { 
          if (i === x && j === y ) val === 0 ? val = 1 : val = 0;
          return val
        })
      })
      return {
        ...state, cells: updateCells
      }
    }
    case 'CLEAR_GRID' : {
      const { cells } = state;
      const { interval } = action

      const clearGrid = cells.map((row, x) => {
          return row.map((val, y) => {
            return cells[x][y] = 0
          })
      })
      return {
        ...state, cells: clearGrid, generations: 0, interval
      }
    }
    case 'CHANGE_GRID_SIZE' :{
      const { interval, rows, cols } = action;

      let cells  = [];
      for(let i = 0; i < rows; i++){
        cells[i] = [];
  
        for(let j = 0; j < cols; j++){
          cells[i][j] = 0;
        }
      }
      return {
        ...state, cells, interval, rows, cols
      }
    }
    case 'CREATE_GRID' : {
      const { rows, cols} = state;
      const { interval } = action;

      let cells  = [];
      for(let i = 0; i < rows; i++){
        cells[i] = [];
  
        for(let j = 0; j < cols; j++){
          cells[i][j] = Math.floor(Math.random() * 2);
        }
      }
      return {
        ...state, cells, interval
      }
    }
    case 'UPDATE_GRID' : {
      const {cells, rows, cols, generations} = state;
      let newGrid = [];
      let updateGeneration = generations;
        
       function countNeighbors (x,y) {
        let alive = 0;
        //check if cell and neigbor exist
        if (cells[x+1] && cells[x+1][y]) alive++;
        if (cells[x+1] && cells[x+1][y+1]) alive++;
        if (cells[x] && cells[x][y+1]) alive++;
        if (cells[x] && cells[x][y-1]) alive++;
        if (cells[x+1] && cells[x+1][y-1]) alive++;
        if (cells[x-1] && cells[x-1][y]) alive++;
        if (cells[x-1] && cells[x-1][y-1]) alive++;
        if (cells[x-1] &&cells[x-1][y+1]) alive++;
        
        let neighborCount = alive;
        return (cells[x][y] && neighborCount === 2 ? 1 : 0) || (neighborCount === 3 ? 1 : 0)
      }  

      for(let x = 0; x < rows; x++){
        newGrid[x] = [];
        for(let y = 0; y < cols; y++){
          newGrid[x][y] = countNeighbors(x,y)
        
        }
      }
      updateGeneration++;

      return {
        ...state, cells: newGrid, generations: updateGeneration
      }
    }
    default: return {
      ...state
    }
  }
}

export default reducer;