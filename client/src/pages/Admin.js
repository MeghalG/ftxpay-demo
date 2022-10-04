import React, { useState, useEffect } from "react";
import { List, Box} from "@mui/material";
import AdminOrder from './../components/AdminOrder'

// Admin page to see all past orders and return/cancel them.

function Admin() {
    const [orders, setOrders] = useState([]);
    const [itemData, setItemData] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('/get_orders')
                .then(res => res.json())
                .then(res =>setOrders(res))
                .then(res => console.log(orders,"hi"));
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
                <AdminOrder order={order} data={itemData} />
            ))}
        </List>
        </Box>
    );
}

export default Admin;