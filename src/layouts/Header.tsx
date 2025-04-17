import { NavLink } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => (isActive ? "active" : "")}>
          Stats
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
