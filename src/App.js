import React, { useContext, useReducer, useEffect } from 'react';
import GameBoardContext from './context';
import GameBoard from './components/GameBoard';
import reducer from './reducer';
import useInterval from './Interval';
import Controls from './components/Controls';

const App = () => {
  const initialState = useContext(GameBoardContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {interval} = state;

  //initialize grid
  useEffect(() => {
    dispatch({type: 'CREATE_GRID', interval: true })
  },[]);

  //update grid
  useInterval(() => {
    dispatch({type: 'UPDATE_GRID'})
  }, interval ? 70 : null)

  return (
    <GameBoardContext.Provider value={{state, dispatch}}>
       <div>
        <GameBoard />
        <Controls />
        {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      </div>
      </GameBoardContext.Provider>
  )
}



export default App;