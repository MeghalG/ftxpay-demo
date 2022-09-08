

export function priceBasket(items) {
    return items.map(item => item.quantity * item.price).reduce((a, b) => a + b, 0)
}