import React, { useState, useEffect } from "react";
import { Typography, ImageListItem, ImageListItemBar, Box, IconButton} from "@mui/material";
import IceCreamIcon from "@mui/icons-material/Icecream";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";



function Item(props) {
    const [qty, setQty] = useState((JSON.parse(localStorage.getItem('cart'))||[])[props.item.id] || 0);

    const addToCart = (e, key) => {
        setQty(qty+1)
    }

    const removeFromCart = (e, key) => {
        if (qty>1) {
            setQty(qty-1);
        }
        else {
            setQty(Math.max(qty-1,0))
        }
    }

    useEffect(() => {
        if (qty == 0) {
            const cart=JSON.parse(localStorage.getItem('cart'));
            if (cart && (props.item.id in cart)) {
                delete cart[props.item.id];
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        }
        else {
            const cart={...JSON.parse(localStorage.getItem('cart')), [props.item.id]:qty};
		    localStorage.setItem('cart', JSON.stringify(cart));
        }
	}, [qty]);

    return (
        <ImageListItem key={props.item.id}>
              <img
              src={`${props.item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${props.item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={props.item.title}
              loading="lazy"
              />
              <ImageListItemBar
              title={
                <Box display='flex' alignItems='center' justifyContent='center'>
                  <IconButton onClick={removeFromCart} disabled={!qty}><RemoveIcon /></IconButton>
                  {props.item.title}
                  <IconButton onClick={addToCart}><AddIcon /></IconButton>
                </Box>
              }
              subtitle={
                <Box display='flex' alignItems='center' justifyContent='center' color='#2196f3'>
                  Qty: {qty || 0}
                </Box>
              }
              position="below"
              />
          </ImageListItem>
    );
}

export default Item;