import React, {useState} from "react";
import './App.css';
import Store from './pages/Store'
import Checkout from './pages/Checkout'

import { Button, Toolbar, Typography, Avatar, AppBar } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function App() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const [checkout, setCheckout] = useState(false);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>Candy Store</Typography>
          <Button style={{ color: 'white' }}><ShoppingCartIcon /></Button>
        </Toolbar>
      </AppBar>
      <Store />
    </div>
  );
}

export default App;
