// server/index.js

import express from "express";
import * as path from "path";
import {cancelOrder, createOrder, getOrder, getOrdersByUser, returnOrder} from "./orders.js";
import {getAvailableItems} from "./items.js";

const PORT = process.env.PORT || 3002;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve('../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/order", (req, res) => {
  res.json({message: 'order endpoint'});
  res.json(getOrder(req.query.id));
});

app.get("/items", (req, res) => {
  res.json(getAvailableItems(req.query.id))
});

app.post("/order", (req, res) => {
  res.json(createOrder(req.body.items,req.body.user))
});

app.post("/order/cancel", (req, res) => {
  const order = getOrder(req.body.id)
  res.json(cancelOrder(order))
});

app.post("/order/return", (req, res) => {
  const order = getOrder(req.body.id)
  res.json(returnOrder(order))
});


app.get("/user/get_orders", (req, res) => {
  res.json(getOrdersByUser(req.query.user))
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});