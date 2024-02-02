import logo from './logo.svg';
import './App.css';

function App() {
  try {
  console.log(process.env.current_env);
  }
  catch (error) {
    console.log(error);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome Cyberkooolies.
        </p>
      </header>
    </div>
  );
}

export default App;
