import React, { useState, useEffect } from "react";
import { List, Box} from "@mui/material";
import Order from './../components/Order'

// Page to show past orders

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('/user/get_orders?user='+localStorage.getItem('userID'))
            .then(res => res.json())
            .then(data=>setOrders(data))
            .then(data => console.log("orders: ", data));
    }, []);

    return (
        <Box alignItems='center' justifyContent='center' display='flex'>
        <List sx={{ maxWidth: 1000 }}>
            {orders.map((order) => (
                <Order order={order} />
            ))}
        </List>
        </Box>
    );
}

export default Orders;