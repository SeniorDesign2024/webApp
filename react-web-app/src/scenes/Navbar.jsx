import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TbHome } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router-dom"
import logo from "../logo2.png";

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    fetch(`/api/auth/logout`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      credentials: "include",
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "Center",
        }}
      >
        <img src={logo} alt="logo" height={"100"} width={"100"} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
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

        <Button
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
        </Button>
        
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