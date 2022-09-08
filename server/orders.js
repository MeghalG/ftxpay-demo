import {createFtxpayOrder} from "./ftxpay";
import {priceBasket} from "./items";

let orders = []

const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function getOrder(orderId) {
    return orders.find(order => order.id === orderId)
}

export function getOrderByUser(user) {
    return orders.find(order => order.user === user)
}

export function createOrder(items, user) {
    const id = uid()
    const ftxpayOrderId = createFtxpayOrder(priceBasket(items), user)
    const newOrder = {id, items, user, ftxpayOrderId, status: "INCOMPLETE"}
    orders.push(newOrder)
    return {id, ftxpayOrderId}
}