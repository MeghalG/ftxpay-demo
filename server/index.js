// server/index.js

import express from "express";
import * as path from "path";
import {cancelOrder, createOrder, getOrder, getOrdersByUser, returnOrder} from "./orders.js";
import {getAvailableItems} from "./items.js";
import * as res from "express";

const PORT = process.env.PORT || 3002;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve('../client/build')));
app.use(express.json());

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/order", async (req, res) => {
  res.json(await getOrder(req.query.id));
});

app.get("/items", (req, res) => {
  res.json(getAvailableItems(req.query.id))
});

app.post("/order", async (req, res) => {
  res.json(await createOrder(JSON.parse(req.body.items), req.body.user))
});

app.post("/order/cancel", async (req, res) => {
  const order = await getOrder(req.body.id)
  res.json(await cancelOrder(order))
});

app.post("/order/return", async (req, res) => {
  const order = await getOrder(req.body.id)
  res.json(await returnOrder(order))
});


app.get("/user/get_orders", async (req, res) => {
  console.log(req.query.user);
  res.json(await getOrdersByUser(req.query.user))
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  console.log(req.url)
  console.log('unhandled')
  res.status(404)
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});