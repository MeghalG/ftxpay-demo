import React, { useState, useEffect } from "react";
import Item from './../components/Item'
import { Box, ImageList } from "@mui/material";


function Store() {

    const [itemData, setItemData] = useState([])

    useEffect(() => {

    fetch('/items')
        .then(res => res.json())
        .then(data=>setItemData(data));
    }, []);


  return (
      <Box display='flex' alignItems='center' justifyContent='center'>
      <ImageList sx={{ maxWidth: 1000}} gap={50} cols={3}>
          {itemData.map((item) => (
            <Item item={item} key = {item.id}/>
          ))}
      </ImageList>
      </Box>
  );
}

export default Store;