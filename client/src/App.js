import React from "react";
import './App.css';
import Store from './pages/Store'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Admin from './pages/Admin'
import LoginDialog from './components/LoginDialog'

import { Button, Toolbar, Typography, AppBar, IconButton, Divider } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";


function App() {
  const [userID, setUserID] = React.useState(localStorage.getItem('userID'));

  const handleLogout = (e) => {
      localStorage.clear();
      setUserID(localStorage.getItem('userID'));
  };

  const handleLogin = (e) => {
    setUserID(localStorage.getItem('userID'));
};
console.log(localStorage.getItem('admin'));

  return (
    <Router>
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }} to="/">
              <Link style={{textDecoration: 'none', color:'white'}} to="/">Example Store </Link>
          </Typography>
          {JSON.parse(localStorage.getItem('admin')) && 
            <><Button style={{ textTransform: 'none' }}>
              <Typography variant="subtitle1">
                <Link style={{ textDecoration: 'none', color: 'white' }} to="/Admin">Admin View </Link>
              </Typography>
            </Button><Divider orientation="vertical" variant="middle" flexItem sx={{ margin: 2 }} /></>}
          <Button style={{textTransform:'none'}}>
            <Typography variant="subtitle1">
              <Link style={{textDecoration: 'none', color:'white'}} to="/Orders">Orders</Link>
            </Typography>
          </Button>
          <Divider orientation="vertical" variant="middle" flexItem sx={{margin:2}}/>
          <Link to="/Cart">
            <IconButton style={{ color: 'white'}}><ShoppingCartIcon /></IconButton>
          </Link>
          <Divider orientation="vertical" variant="middle" flexItem sx={{margin:2}}/>
          <Typography variant="subtitle1" >
              {userID}
          </Typography>
          <IconButton style={{ color: 'white' }}><LogoutIcon onClick={handleLogout} /></IconButton>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route exact path="/" element={<Store key={userID}/>}/>
        <Route exact path="/Cart" element={<Checkout key={userID}/>}/>
        <Route exact path="/Orders" element={<Orders key={userID}/>}/>
        <Route exact path="/Admin" element={<Admin key={userID}/>}/>
      </Routes>
      <LoginDialog onClose={handleLogin} open={!userID}/>
    </div>
    </Router>
    
  );
}

export default App;
