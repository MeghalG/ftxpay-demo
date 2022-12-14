import React, { useState, useEffect } from "react";
import { Alert, Button, Divider, Card, List, ListItem, ListItemText, ListItemAvatar, Typography, Box} from "@mui/material";

// Display for individual order on (past) orders page. Includes status of the order.

const appId = "6845"

function Order(props) {

    const handleClick = () => {
        window.location.href = 'https://ftx.us/pay/request?id='+appId+"&orderId="+props.order.id;
    };

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
                                src={`${((props.data || {})[item[0]] || {}).img}?w=100&fit=crop&auto=format`}
                                srcSet={`${((props.data || {})[item[0]] || {}).img}?w=100&fit=crop&auto=format&dpr=2 2x`}
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
                                    Price: ${((props.data || {})[item[0]] || {price:0}).price.toFixed(2)}
                                    </React.Fragment>
                                </div>
                            }
                            />
                        </Box>
                    ))}
                </List>
                <Divider orientation="vertical" variant='middle' flexItem sx={{marginLeft:15, marginRight:5}}/>
                <ListItemText
                secondary={
                    <Box sx={{marginTop:1}}>
                        <React.Fragment>
                        Total: ${(getTotal(props.order, (props.data || {})) || 0).toFixed(2)}
                        <br />
                        Ordered On: {new Date(props.order.createdAt).toDateString()}
                        </React.Fragment>
                        <br />
                        {props.order.status==='incomplete' &&
                            <Button onClick={handleClick} variant='contained' >
                                Pay with FTX 
                            </Button>
                        }
                        {props.order.status==='complete' &&
                            <Alert severity='success' >
                                Your payment is complete.
                            </Alert>
                        }
                        {props.order.status!=='incomplete' && props.order.status!=='complete' &&
                            <Alert severity='info' >
                                Your order status is {props.order.status}.
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

function getTotal(order, data) {
    return Object.keys(order.items).map(id => (data[id] ||{}).price * order.items[id]).reduce((a, b) => a + b, 0)
}

export default Order;