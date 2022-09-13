import {cancelFtxpayOrder, createFtxpayOrder, getFtxpayOrder, returnFtxpayOrder} from "./ftxpay.js";
import {priceBasket} from "./items.js";
import * as res from "express";

let orders = []

const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function getOrder(orderId) {
    const order = orders.find(order => order.id === orderId)
    updateOrder(order)
    return order
}

export function getOrdersByUser(user) {
    orders = orders.filter(order => order.user === user)
    orders.forEach(updateOrder)
    return orders
}

export function createOrder(items, user) {
    const id = uid()
    const ftxpayOrderId = createFtxpayOrder(priceBasket(items), user)
    const newOrder = {id, items, user, ftxpayOrderId, status: "incomplete"}
    orders.push(newOrder)
    return newOrder
}

export function updateOrder(order) {
    const ftxpayOrder = getFtxpayOrder(order.ftxpayOrderId)
    if (!!ftxpayOrder?.status){
        order.status = ftxpayOrder.status
    }
}

export function cancelOrder(order) {
    updateOrder(order)
    if (!(order.status === "incomplete")){
        return res.status(400).json({status: 400, message: "Order not incomplete"})
    }
    return cancelFtxpayOrder(order.ftxpayOrderId);
}

export function returnOrder(order) {
    updateOrder(order)
    if (!(order.status === "complete")){
        return res.status(400).json({status: 400, message: "Order not complete"})
    }
    return returnFtxpayOrder(order.ftxpayOrderId);
}