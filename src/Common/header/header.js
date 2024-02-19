import logo from '../../assets/fit-coder.png';
import './header.scss';
function Header() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Welcome to Cyber Fitness.
      </p>
    </header>
  );
}

export default Header;