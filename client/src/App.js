import React, {useState} from "react";
import './App.css';
import Store from './pages/Store'
import Checkout from './pages/Checkout'

import { Button, Toolbar, Typography, Avatar, AppBar, IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";


function App() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const [checkout, setCheckout] = useState(false);

  return (
    <Router>
    <div>
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h4" sx={{ flexGrow: 1 }} to="/">
              <Link style={{textDecoration: 'none', color:'white'}} to="/">Candy Store </Link>
            </Typography>
          <Link to="/Cart">
            <IconButton style={{ color: 'white' }}><ShoppingCartIcon /></IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route exact path="/" element={<Store/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
