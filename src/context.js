import React from 'react';

const GameBoardContext = React.createContext( {
  rows: 10,
  cols: 10,
  generations: 0,
  interval: false,
  cells: []

})


export default GameBoardContext