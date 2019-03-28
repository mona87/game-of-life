import React, { useContext } from 'react';
import GameBoardContext from '../context';

const GameBoard = () => {
  const {state, dispatch} = useContext(GameBoardContext);
  const {cells, table} = state;

  const chooseColor = (val) => {
    return val === 0 ? 'white' : 'grey';
  } 

  const selectCell = (x,y) => {
    dispatch({type:'SELECT_CELL', x, y})
  }

  //create table view
  const createTable = () => {
    let table = [];
    cells.map((row, x ) => {
      let children = [];
      row.map((val, y) =>{
         return(children.push (
            <td 
            key={y} 
            style={{background: chooseColor(cells[x][y]) }} 
            className="cell"
            onClick={() => selectCell(x,y)}
            >
          </td>
          )
        )
      })
      return table.push(<tr key={x}>{children}</tr>)
    })
    return table;
  }

  return (
    <table style={{borderCollapse: 'collapse'}}>
      <tbody>
        {createTable()}
      </tbody>
    </table>
  )
}


export default GameBoard;