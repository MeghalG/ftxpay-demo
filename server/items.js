

let all_items = []



export function getAvailableItems() {
    return all_items
}


export function priceBasket(items) {
    return items.map(item => item.quantity * item.price).reduce((a, b) => a + b, 0)
}