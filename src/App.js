import logo from './assets/fit-coder.webp';
import Registration from './registration/registration';
import './App.css';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    console.log("blah!")
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Cyber Fitness.
        </p>
      </header>
      <Registration/>
    </div>
  );
}

export default App;
