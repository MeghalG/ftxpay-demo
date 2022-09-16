import React, { useState, useEffect } from "react";
import { Button, Divider, List, ListItem, ListItemText, ListItemAvatar, ListItemIcon, Typography, Box} from "@mui/material";

function Orders() {
    const [itemData, setItemData] = useState({});
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('/items')
            .then(res => res.json())
            .then(data=>setItemData(Object.fromEntries(data.map(item => {return [item.id, item];}))));
    }, []);

    useEffect(() => {
        console.log('/user/get_orders?user='+localStorage.getItem('userID'))
        fetch('/user/get_orders?user='+localStorage.getItem('userID'))
            .then(res => res.json())
            .then(data=>setOrders(data))
            .then(data => console.log("orders: ", orders));
    }, []);

    return (
        <Box alignItems='center' justifyContent='center'>
        <List sx={{ maxWidth: 1000 }}>
            {orders.map((item) => (
                <ListItem >
                    <ListItemText
                    primary={"Placed September 8"}
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
        </Box>
    );
}

export default Orders;