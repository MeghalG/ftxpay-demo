import {cancelFtxpayOrder, createFtxpayOrder, getFtxpayOrder, returnFtxpayOrder} from "./ftxpay.js";
import {priceBasket} from "./items.js";
import * as res from "express";

let orders = []

const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export async function getOrder(orderId) {
    const order = orders.find(order => order.id === orderId)
    await updateOrder(order)
    return order
}

// does this not delete other users' orders?
export async function getOrdersByUser(user) {
    let user_orders = orders.filter(order => order.user === user)
    user_orders.forEach(await updateOrder)
    return user_orders
}

export async function getAllOrders() {
    orders.forEach(await updateOrder)
    return orders
}

export async function createOrder(items, user) {
    const id = uid()
    const ftxpayOrderId = await createFtxpayOrder(priceBasket(items))
    const newOrder = {id, items, user, ftxpayOrderId, createdAt: Date.now(), status: "incomplete"} // add date of order creation
    orders.push(newOrder)
    return newOrder
}

export async function updateOrder(order) {
    console.log(order)
    const ftxpayOrder = await getFtxpayOrder(order.ftxpayOrderId)
    console.log(ftxpayOrder)
    if (!!ftxpayOrder?.status){
        order.status = ftxpayOrder.status
    }
}

export async function cancelOrder(order) {
    await updateOrder(order)
    if (!(order.status === "incomplete")){
        return res.status(400).json({status: 400, message: "Order not incomplete"})
    }
    return cancelFtxpayOrder(order.ftxpayOrderId);
}

export async function returnOrder(order) {
    const ftxpayOrder = await getFtxpayOrder(order.ftxpayOrderId)
    if (!(ftxpayOrder.status === "complete")){
        return res.status(400).json({status: 400, message: "Order not complete"})
    }
    return await returnFtxpayOrder(ftxpayOrder.payment.id);
}