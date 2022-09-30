import React, { useState, useEffect } from "react";
import { Button, Divider, List, ListItem, ListItemText, ListItemAvatar, Box} from "@mui/material";

// Page to show user's cart and allow checkout with FTX Pay.

const appId = "6845"

function Checkout() {
    const [itemData, setItemData] = useState(undefined)

    useEffect(() => {
        fetch('/items')
            .then(res => res.json())
            .then(data=>setItemData(Object.fromEntries(data.map(item => {return [item.id, item];}))));
    }, []);

    const handleClick = () => {
        const request = JSON.stringify({items: localStorage.getItem('cart'), user: localStorage.getItem('userID')});
        localStorage.setItem('cart', '{}')
        fetch('/order', {
            method: 'POST', 
            mode: 'cors', 
            headers: {"Content-Type": "application/json"},
            body: request
        })
            .then(res => res.json())
            .then(result => result.ftxpayOrderId && (window.location.href = 'https://ftx.us/pay/request?id='+appId+"&orderId="+result.ftxpayOrderId));
    };

    return (
        <Box display='flex' alignItems='center' justifyContent='center'>
        <List sx={{ maxWidth: 1000 }}>
            {itemData && Object.entries(JSON.parse(localStorage.getItem('cart'))).map(item => (
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
        <Button variant='contained' onClick={handleClick} disabled={localStorage.getItem('cart')==='{}'}>
            Pay with FTX
        </Button>
        </Box>
    );
}

export default Checkout;