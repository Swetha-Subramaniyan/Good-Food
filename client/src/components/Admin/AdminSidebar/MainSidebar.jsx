import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../Sidebar/SidebarContext";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Inbox as InboxIcon,
  ListAlt as SubscriptionIcon,
  People as UsersIcon,
  Restaurant as MenuIcon,
  Layers as ParentPlanIcon,
  Category as TierIcon,
  Schedule as DurationIcon,
  Straighten as QuantityIcon,
  Fastfood as FoodIcon,
} from "@mui/icons-material";
import { Typography } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const role = localStorage.getItem("role");

const menuItems = [
  { text: "Orders", icon: <InboxIcon />, path: "/admin/orderlist" },
  {
    text: "Subscription Plan",
    icon: <SubscriptionIcon />,
    path: "/admin/addsubscription",
  },
  {
    text: "Subscribed Users",
    icon: <UsersIcon />,
    path: "/admin/subscribedusers",
  },
  {
    text: "Daily Menu (In-Progress)",
    icon: <MenuIcon />,
    path: "/admin/dailymenu",
  },
  {
    text: "Parent Plan Management",
    icon: <ParentPlanIcon />,
    path: "/admin/parentplan",
  },
  { text: "Tier Management", icon: <TierIcon />, path: "/admin/tier" },
  {
    text: "Duration Management",
    icon: <DurationIcon />,
    path: "/admin/duration",
  },
  {
    text: "Quantity Management",
    icon: <QuantityIcon />,
    path: "/admin/quantity",
  },
  {
    text: "Food Items Managem ent",
    icon: <FoodIcon />,
    path: "/admin/fooditems",
  },
  {
    text: "Cancelled Subscription",
    icon: <FoodIcon />,
    path: "/admin/cancelSubscription",
  },
];

const filteredMenuItems =
  role === "DELIVERY"
    ? menuItems.filter((item) => item.text === "Orders")
    : menuItems;

const MainSidebar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

  const handleDrawerOpen = () => {
    setOpen(true);
    toggleSidebar();
  };

  const handleDrawerClose = () => {
    setOpen(false);
    toggleSidebar();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "primary.main" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              paddingLeft:"0.5rem",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 1,
               
              },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                mr: 2,
                ...(open && { display: "none" }),
                "&:hover": {
                  backgroundColor: "transparent", 
                },
              }}
            >
              <MenuIcon />
              <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                Menu
              </Typography>
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 1,
              },
            }}
          >
            <IconButton
              color="inherit"
              onClick={handleLogout}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent", 
                },
              }}
            >
              <Typography variant="body1" component="span" sx={{ mr: 1 }}>
                Logout
              </Typography>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {filteredMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "primary.main", minWidth: "40px" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
};

export default MainSidebar;
