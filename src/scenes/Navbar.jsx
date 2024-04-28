import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TbHome } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router-dom"
import logo from "../logo2.png";

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }) => {
  /* Variables */
  const navigate = useNavigate();      /* Navigates to appropriate pages as per the route provided */
  const location = useLocation();      /* Returns the current location object */

  /**
   * Handles logout functionality of the application.
   */
  const handleLogout = () => {
    fetch(`/api/auth/logout`, {
      method: "POST",
      headers: {'Content-Type': 'application/json', 'x-access-token': sessionStorage.getItem("accessToken") },
    })
    .then(response => {
      if (!response.ok) {
        console.log(response.statusText)
      } else {
        navigate("/");
      }
    })
  }

  return (
    <Box
      sx={{
        width: "100%",
        my: 1,
        py: 1,
        px: 1,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      {/* LOGO */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "Center",
        }}
      >
        <img src={logo} alt="logo" height={"100"} width={"100"} />
      </Box>

      {/* NAV BUTTONS */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* HOME BUTTON */}
        {location.pathname !== '/my-events' && (<Button
          onClick={() => navigate("/my-events")}
          sx={{
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ":hover": {
              backgroundColor: "rgba(58,12,163, 0.04)"
            }
          }}
        >
          <TbHome size={30} color="#3A0CA3" />
        </Button>)}

        {/* USER PROFILE BUTTON */}
        {location.pathname !== '/user-info' && (<Button
          onClick={() => navigate("/user-info")}
          sx={{
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ":hover": {
              backgroundColor: "rgba(58,12,163, 0.04)"
            }
          }}
        >
          <CgProfile size={30} color="#3A0CA3" />
        </Button>)}
        
        {/* LOGOUT BUTTON */}
        <Button
          onClick={() => handleLogout() }
          sx={{
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ":hover": {
              backgroundColor: "rgba(58,12,163, 0.04)"
            }
          }}
        >
          <TbLogout size={30} color="#3A0CA3" />
        </Button>
      </Box>
    </Box>
  )
}

export default Navbar;