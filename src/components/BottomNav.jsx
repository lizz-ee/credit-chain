import { NavLink } from "react-router-dom";
import "./BottomNav.css";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/feed" className="nav-item">
        <span className="icon">🏠</span>
        <span className="label">Feed</span>
      </NavLink>

      <NavLink to="/holdings" className="nav-item">
        <span className="icon">💰</span>
        <span className="label">Holdings</span>
      </NavLink>

      <NavLink to="/create" className="nav-item center">
        <span className="icon">＋</span>
      </NavLink>

      <NavLink to="/loans" className="nav-item">
        <span className="icon">🏦</span>
        <span className="label">Loans</span>
      </NavLink>

      <NavLink to="/profile" className="nav-item">
        <span className="icon">👤</span>
        <span className="label">Profile</span>
      </NavLink>
    </nav>
  );
}