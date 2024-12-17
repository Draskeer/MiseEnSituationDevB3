import "./header.css";
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <img src={logo} alt="logo" />
      <h1>Groupe Saint-Exupéry</h1>
      <NavLink to="/login">Se connecter</NavLink>
    </header>
  );
};

export default Header;
