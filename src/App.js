
import './App.css';
import { useEffect } from 'react';
import Login from './Login/login';

function App() {

  useEffect(() => {
    console.log("blah!")
  });

  return (
      <Login/>
  );
}

export default App;
