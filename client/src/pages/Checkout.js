import React, { useState, useEffect } from "react";
import { Button, Divider, List, ListItem, ListItemText, ListItemAvatar, ListItemIcon, Typography, Box} from "@mui/material";

function Checkout() {
    const [itemData, setItemData] = useState({})

    useEffect(() => {
        fetch('/items')
            .then(res => res.json())
            .then(data=>setItemData(Object.fromEntries(data.map(item => {return [item.id, item];}))));
    }, []);

    const handleClick = () => {
        console.log(JSON.parse(localStorage.getItem('cart')))
        fetch('/order', {
            method: 'POST', 
            mode: 'cors', 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({items: localStorage.getItem('cart'), user: localStorage.getItem('userID')})
        })
            .then(res => res.json())
            .then(window.location.href = 'https://ftx.us/home')
            .then(data => console.log(data));
    };

    return (
        <Box display='flex' alignItems='center' justifyContent='center'>
        <List sx={{ maxWidth: 1000 }}>
            {Object.entries(JSON.parse(localStorage.getItem('cart'))).map(item => (
                <ListItem >
                    <ListItemAvatar sx={{marginRight:3}}>
                    <img
                        src={`${(itemData[item[0]] || {}).img}?w=150&fit=crop&auto=format`}
                        srcSet={`${(itemData[item[0]] || {}).img}?w=150&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                    </ListItemAvatar>
                    <ListItemText
                    primary={(itemData[item[0]] || {}).title}
                    secondary={
                        <div>
                            <React.Fragment>
                            Quantity: {item[1]}
                            </React.Fragment>
                            <br />
                            <React.Fragment>
                            Price: ${(itemData[item[0]] || {price:0}).price.toFixed(2)}
                            </React.Fragment>
                        </div>
                    }
                    />
                </ListItem>
            ))}
        </List>
        <Divider orientation="vertical" variant='middle' flexItem sx={{marginTop:3, marginBottom:3, marginLeft:20, marginRight:10}}/>
        <Button variant='contained' onClick={handleClick}>
            Pay with FTX
        </Button>
        </Box>
    );
}

export default Checkout;