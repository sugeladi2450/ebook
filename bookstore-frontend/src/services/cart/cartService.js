// 购物车服务：提供与购物车相关的数据处理函数，如计算总价和移除项等
export function calculateCartTotal(items) {
  return items.reduce((sum, item) => sum + Number(item.book.price) * Number(item.number ?? 1), 0);
}

export function calculateSelectedCartTotal(items, selectedIds) {
  return items
    .filter((item) => selectedIds.has(String(item.id)))
    .reduce((sum, item) => sum + Number(item.book.price) * Number(item.number ?? 1), 0);
}

export function removeCartItem(items, itemId) {
  return items.filter((item) => item.id !== itemId);
}
