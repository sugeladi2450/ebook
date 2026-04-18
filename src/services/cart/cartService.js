export function calculateCartTotal(items) {
  return items.reduce((sum, item) => sum + Number(item.book.price), 0);
}

export function removeCartItem(items, itemId) {
  return items.filter((item) => item.id !== itemId);
}
