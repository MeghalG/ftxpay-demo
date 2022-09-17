import React, { useState, useEffect } from "react";
import { Alert, Button, Divider, Card, List, ListItem, ListItemText, ListItemAvatar, Typography, Box} from "@mui/material";

// Display for individual order on (past) orders page. Includes status of the order.

function Order(props) {

    const [itemData, setItemData] = useState({});

    useEffect(() => {
        fetch('/items')
            .then(res => res.json())
            .then(data=>setItemData(Object.fromEntries(data.map(item => {return [item.id, item];}))));
    }, []);

    return (
        <ListItem >
            <Card variant='outlined' sx={{padding:2, width:'100%'}}> 
                <Typography variant='h5'> Order #: {props.order.id} </Typography>
                <Box sx={{display:'flex', paddingLeft:5}} >
                <List>
                    {Object.entries(props.order.items).map((item) => (
                        <Box sx={{display:'flex'}}>
                            <ListItemAvatar sx={{marginRight:3}}>
                            <img
                                src={`${(itemData[item[0]] || {}).img}?w=100&fit=crop&auto=format`}
                                srcSet={`${(itemData[item[0]] || {}).img}?w=100&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                            </ListItemAvatar>
                            <ListItemText
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
                        </Box>
                    ))}
                </List>
                <Divider orientation="vertical" variant='middle' flexItem sx={{marginLeft:10, marginRight:4}}/>
                <ListItemText
                secondary={
                    <Box sx={{marginTop:1}}>
                        <React.Fragment>
                        Total: ${(getTotal(props.order, itemData) || 0).toFixed(2)}
                        <br />
                        Order date: {props.order.date}
                        </React.Fragment>
                        <br />
                        {props.order.status==='incomplete' &&
                            <Button variant='contained' >
                                Pay with FTX 
                            </Button>
                        }
                        {props.order.status==='processing' &&
                            <Alert severity='info' >
                                Your payment is processing.
                            </Alert>
                        }
                        {props.order.status==='complete' &&
                            <Alert severity='success' >
                                Your payment is complete.
                            </Alert>
                        }
                    </Box>
                }
                />
                </Box>
            </Card>
        </ListItem>
    );
}

function getTotal(order, itemData) {
    return Object.keys(order.items).map(id => (itemData[id] ||{}).price * order.items[id]).reduce((a, b) => a + b, 0)
}

export default Order;