import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";

const Header = ({ isConnected, isAdmin }) => {
  return (
    <header className="flex items-center gap-5 bg-green-500 text-white p-4">
      <img src={logo} alt="logo" className="h-12 w-12" />
      <h1 className="flex-grow text-2xl font-bold">Groupe Saint-Exupéry</h1>
      {isAdmin && (
        <>
          <NavLink
            to="add-student"
            className="bg-white text-green-500 px-3 py-1 text-sm rounded-md cursor-pointer"
          >
            Ajouter un élève
          </NavLink>
          {/* <NavLink
            to="/signup"
            className="bg-white text-green-500 px-3 py-1 text-sm rounded-md cursor-pointer"
          >
            Créer un compte de professeur
          </NavLink> */}
        </>
      )}
      {isConnected && (
        <NavLink
          to="/login"
          className="bg-white text-green-500 px-3 py-1 text-sm rounded-md cursor-pointer"
        >
          Se déconnecter
        </NavLink>
      )}
    </header>
  );
};

export default Header;
