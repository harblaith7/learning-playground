import React from 'react';
import './App.css';
import ButtonIncrement from "./ButtonIncrement"
import ButtonDecrement from "./ButtonDecrement"
import Counter from "./Counter"
import {Provider} from "react-redux"
import store from "./redux/store"


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Counter/>
        <ButtonIncrement/>
        <ButtonDecrement/> 
      </div>
    </Provider>
  );
}

export default App;
