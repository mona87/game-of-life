import React, {useContext} from 'react';
import GameBoardContext from '../context';

const Controls = () => {
const {state, dispatch} = useContext(GameBoardContext);
const {rows, cols} = state;

const clearGrid = () => {
  dispatch({type: 'CLEAR_GRID', interval: false});
}

const newGrid = () => {
  dispatch({type: 'CREATE_GRID', interval: true, rows, cols})
}

const playCycle = () => {
  dispatch({type: 'START_CYCLE', interval: true})
}

const pauseCycle = () => {
  dispatch({type: 'PAUSE_CYCLE', interval: false})
}

const changeRows = (e) => {
  //if empty string default to 0
  let val = e.target.value;
  if(!val) val = 0;
  dispatch({type: 'CHANGE_GRID_SIZE', cols, rows: parseInt(val), interval: false})
}

const changeColumns = (e) => {
  //if empty string default to 0
  let val = e.target.value;
  if(!val) val = 0;
  dispatch({type: 'CHANGE_GRID_SIZE', rows, cols: parseInt(val), interval: false})
}

return(
    <>
      <label>Rows</label>
      <input onChange={changeRows} defaultValue={rows}  />
      <label>Columns</label>
      <input onChange={changeColumns} defaultValue={cols} />
      <br/>
      <button onClick={clearGrid}>
        Clear Grid
      </button>
      <button onClick={newGrid} >
        New Grid
      </button>
      <button onClick={playCycle}> 
        Play Cycle
      </button>
      <button onClick={pauseCycle}>
        Pause Cycle
      </button>

    </>
  )
}

export default Controls