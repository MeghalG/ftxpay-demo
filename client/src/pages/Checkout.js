import React from "react";
import { Button, Divider, List, ListItem, ListItemText, ListItemAvatar, ListItemIcon, Typography, Box} from "@mui/material";

function Checkout() {
    const handleClick = () => {
        
    };

    return (
        <Box display='flex' alignItems='center' justifyContent='center'>
        <List sx={{ maxWidth: 1000 }}>
            {Object.entries(JSON.parse(localStorage.getItem('cart'))).map(item => (
                <ListItem >
                    <ListItemAvatar sx={{marginRight:3}}>
                    <img
                        src={`${item[0]}?w=150&fit=crop&auto=format`}
                        srcSet={`${item[0]}?w=150&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                    </ListItemAvatar>
                    <ListItemText
                    primary="Item Name"
                    secondary={
                        <React.Fragment>
                        {"Quantity and Price"}
                        </React.Fragment>
                    }
                    />
                </ListItem>
            ))}
        </List>
        <Divider orientation="vertical" variant='middle' flexItem sx={{marginTop:3, marginBottom:3, marginLeft:20, marginRight:10}}/>
        <Button variant='contained' onClick={handleClick}>
            Checkout
        </Button>
        </Box>
    );
}

export default Checkout;