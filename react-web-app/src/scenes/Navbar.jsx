import { useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import logo from "../logo2.png";

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");
  const navbarBackground = isTopOfPage ? "bg-light-purple" : "";

  return (
    <nav className={`${navbarBackground} z-40 w-full fixed top-0 py-6`}>
      <div className="flex items-center justify-between mx-auto w-5/6">
        <div className="justify-center">
          <img src={logo} alt="logo" />
        </div>
      </div>
    </nav>
  )
}

export default Navbar;