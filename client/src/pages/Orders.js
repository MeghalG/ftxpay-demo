import React, { useState, useEffect } from "react";
import { List, Box} from "@mui/material";
import Order from './../components/Order'

// Page to show past orders

function Orders() {
    const [orders, setOrders] = useState([]);
    const [itemData, setItemData] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('/user/get_orders?user='+localStorage.getItem('userID'))
                .then(res => res.json())
                .then(data=>setOrders(data));
            }, 200);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetch('/items')
            .then(res => res.json())
            .then(data=>setItemData(Object.fromEntries(data.map(item => {return [item.id, item];}))));
    }, [orders]);

    return (
        <Box alignItems='center' justifyContent='center' display='flex'>
        <List sx={{ maxWidth: 1000 }}>
            {orders.map((order) => (
                <Order order={order} data={itemData} />
            ))}
        </List>
        </Box>
    );
}

export default Orders;