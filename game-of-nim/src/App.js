import React from 'react';
import './App.css';
import NimGame from './NimGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Game of Nim</h1>
      </header>
      <main>
        <NimGame />
      </main>
    </div>
  );
}

export default App;
