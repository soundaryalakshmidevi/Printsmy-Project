import * as React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Images3 from '../assets/img3.png';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EventIcon from '@mui/icons-material/Event';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import bg from '../assets/bg.png';
import '../css/admin.css';
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert2';
const drawerWidth = 240;

function MobileDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'No, stay'
    }).then(async (result) => {
      if (result.isConfirmed) {
        localStorage.clear();

        Swal.fire(
          'Logged out!',
          'You have been logged out successfully.',
          'success'
        );

        navigate("/");
      }
    });
  };

  const getIcon = (text) => {
    if (text === 'All Users') {
      return <AccountBoxIcon className='icon_eli' />;
    } else if (text === 'Add User') {
      return <PersonAddIcon className='icon_eli' />;
    } else if (text === 'View Events') {
      return <EventIcon className='icon_eli' />;
    } else {
      return <AddPhotoAlternateRoundedIcon className='icon_eli' />;
    }
  };

  const drawer = (
    <div>
      <div style={{ textAlign: 'center', paddingTop: '5px'}}>
        <Typography variant="h6" noWrap component="div">
          <img
            src={Images3}
            alt="Logo"
            style={{ height: 50, marginRight: 'auto', padding: '8px' }}
          />
        </Typography>
      </div>
      
      <Divider />
      <List>
        {[
          { text: "Add User", to: "/new-user" },
          { text: "All Users", to: "/all-users" },
          { text: "View Events", to: "/view-events" },
          { text: "View Designs", to: "/view-designs" },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.to}>
              <ListItemIcon>
                {getIcon(item.text)}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
     
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        
          <Button
              color="inherit"
              onClick={handleLogout}
              endIcon={
                <LogoutIcon
                className="logout"
                  sx={{
                    height: "30px",
                    width: "30px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                />
              }
              sx={{
                marginLeft: "auto",
                color: "#fff",
                textAlign: "end",
              }}
            >
              <span className="logout-text">Logout</span>
          
            </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

MobileDrawer.propTypes = {
  window: PropTypes.func,
};

export default MobileDrawer;



// import * as React from 'react';
// import PropTypes from 'prop-types';
// import {
//   AppBar,
//   Button,
//   Box,
//   CssBaseline,
//   Divider,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Typography
// } from '@mui/material';
// import { Menu as MenuIcon, Mail as MailIcon } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
// import Images3 from '../assets/img3.png';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import EventIcon from '@mui/icons-material/Event';
// import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
// import bg from '../assets/bg.png';
// import '../css/admin.css';
// import LogoutIcon from "@mui/icons-material/Logout";

//     const drawerWidth = 240;

//     function MobileDrawer(props) {
//       const { window } = props;
//       const [mobileOpen, setMobileOpen] = React.useState(false);

//       const handleDrawerClose = () => {
//         setMobileOpen(false);
//       };

//       const handleDrawerToggle = () => {
//         setMobileOpen(!mobileOpen);
//       };

//       const getIcon = (text) => {
//         if (text === 'All Users') {
//           return <AccountBoxIcon className='icon_eli' />;
//         } else if (text === 'Add User') {
//           return <PersonAddIcon className='icon_eli' />;
//         } else if (text === 'View Events') {
//           return <EventIcon className='icon_eli' />;
//         } else {
//           return <AddPhotoAlternateRoundedIcon className='icon_eli' />;
//         }
//       };

//       const drawer = (
//         <div>
//           <div style={{ textAlign: 'center', paddingTop: '5px'}}>
//           <Typography variant="h6" noWrap component="div">
//                 <img
//                   src={Images3}
//                   alt="Logo"
//                   style={{ height: 50, marginRight: 'auto', padding: '8px' }}
//                 />
//               </Typography>
//           </div>
          
//           <Divider />
//           <List>
           
//             {[
              
//               { text: "Add User", to: "/new-user" },
//               { text: "All Users", to: "/all-users" },
//               // { text: "Events", to: "/events" },
//               { text: "View Events", to: "/view-events" },
//               // { text: "Add Designs", to: "/AddDesigns" },
//               { text: "View Designs", to: "/view-designs" },
//             ].map((item, index) => (
//               <ListItem key={item.text} disablePadding>
                
//                 <ListItemButton component={Link} to={item.to}>
//                   <ListItemIcon>
//                   {getIcon(item.text)}
//                   </ListItemIcon>
//                   <ListItemText primary={item.text} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//           <Divider />
//           <Button
//         color="inherit"
//         endIcon={<LogoutIcon />}
//         sx={{ marginLeft: "auto" }}
//       >
//         Logout
//       </Button>
//         </div>
      
//       );

//       const container = window !== undefined ? () => window().document.body : undefined;

//       return (
//         <Box sx={{ display: '#000',}}>
//           <CssBaseline />
//           <AppBar
//             position="fixed"
//             sx={{
//               width: { sm: `calc(100% - ${drawerWidth}px)` },
//               ml: { sm: `${drawerWidth}px` },
//             }}
//           >
//             <Toolbar>
//               <IconButton
//                 color="inherit"
//                 aria-label="open drawer"
//                 edge="start"
//                 onClick={handleDrawerToggle}
//                 sx={{ mr: 2, display: { sm: 'none' } }}
//               >
//                 <MenuIcon />
//               </IconButton>
              
//             </Toolbar>
//           </AppBar>
//           <Box
//             component="nav"
//             sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//             aria-label="mailbox folders"
//           >
//             <Drawer
//               container={container}
//               variant="temporary"
//               open={mobileOpen}
//               onClose={handleDrawerClose}
//               ModalProps={{
//                 keepMounted: true,
//               }}
//               sx={{
//                 display: { xs: 'block', sm: 'none' },
//                 '& .MuiDrawer-paper': {
//                   boxSizing: 'border-box',
//                   width: drawerWidth,
//                 },
//               }}
//             >
//               {drawer}
//             </Drawer>
//             <Drawer
//               variant="permanent"
//               sx={{
//                 display: { xs: 'none', sm: 'block' },
//                 '& .MuiDrawer-paper': {
//                   boxSizing: 'border-box',
//                   width: drawerWidth,
//                 },
//               }}
//               open
//             >
//               {drawer}
//             </Drawer>
//           </Box>
//           <Box
//             component="main"
//             sx={{
//               flexGrow: 1,
//               bgcolor: 'background.default',
//               p: 3,
//               backgroundImage: `url(${bg})`,
//               backgroundColor: '#014550',
//               marginTop: 8,
//               marginLeft: 0,
//               overflow: 'auto',
//             }}
//           >
//             <Toolbar />
//             <Typography paragraph>
//               {/* This is where the main content will be rendered */} 
//             </Typography>
//           </Box>
//         </Box>
//       );
//     }

//     MobileDrawer.propTypes = {
//       window: PropTypes.func,
//     };

//     export default MobileDrawer;
