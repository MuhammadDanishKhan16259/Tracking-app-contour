import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../assets/navbar-logo-white.png";
import exerciseIcon from "../assets/exercise-icon.png";
import homeIcon from "../assets/home-icon.png";
import aboutIcon from "../assets/about-icon.png";
import newStyled from "@emotion/styled";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'

const drawerWidth = "70%";

const navItems = [
  { text: "Home", to: "/" },
  { text: "Favourites", to: "/favorite" },
  { text: "Exercises", to: "/exercises" },
  { text: "About Us", to: "/about" },
  { text: "Logout", to: "#" },
];
const navItemsIcons = [
  { icon: homeIcon, to: "/" },
  // { icon: favouriteIcon, to: "/favorite" },
  { icon: exerciseIcon, to: "/exercises" },
  { icon: aboutIcon, to: "/about" },
];

const MyComponent = newStyled("div")({
  width: "100%",
  "&:hover": {
    backgroundColor: "#edf5ef",
  },
});

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const notify = () =>
  toast.success("Logout Successfully", {
    position: "bottom-left",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", position: "sticky", top: 0,  boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)', }}
    >
      <Typography
        variant="h4"
        sx={{ my: 3, fontWeight: "bolder", color: "#50A060" }}
      >
        BE - FIT
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <Link style={{textDecoration:"none"}} key={index} to={item.to}>
            <ListItem key={item} disablePadding>
              <MyComponent>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText style={{color:'#000'}} primary={item.text} />
                </ListItemButton>
              </MyComponent>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#50A060" }}>
        <Toolbar>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              paddingY: "10px",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to={"/"}>
              <img src={logo} alt="logo" width={100} />
            </Link>
            <Box>
              {navItemsIcons.map((item, index) => (
                <Link to={item.to} key={{ index }}>
                  <Button
                    sx={{
                      color: "#fff",
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      fontSize: "16px",
                      letterSpacing: "1px",
                    }}
                  >
                    <img src={item.icon} alt="Navbar Icons" width={30} />
                  </Button>
                </Link>
              ))}
              <Button
                sx={{
                  color: "#fff",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  fontSize: "16px",
                  letterSpacing: "1px",
                }}
                onClick={()=>{
                  localStorage.removeItem("Token");
                  localStorage.removeItem("RefreshToken");
                  notify()
                  location.replace('/')
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              width: "100%",
              paddingY: "10px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img src={logo} alt="logo" width={100} />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          anchor="right"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      {/* <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
          fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
          aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
          cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
          at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
          Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
          numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
          asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
          assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
          soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
          ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
          soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
          Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
          delectus quo eius exercitationem tempore. Delectus sapiente, provident
          corporis dolorum quibusdam aut beatae repellendus est labore quisquam
          praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
          deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
          fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
          recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
          debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
          praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
          voluptate iure labore, repellendus beatae quia unde est aliquid dolor
          molestias libero. Reiciendis similique exercitationem consequatur, nobis
          placeat illo laudantium! Enim perferendis nulla soluta magni error,
          provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
          iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
          Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
          reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
          cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
          consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
          Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
          dolores sunt inventore perferendis, aut sapiente modi nesciunt.
        </Typography>
      </Box> */}
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
