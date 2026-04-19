// 格式化价格，保留两位小数，并添加货币符号
export function formatPrice(price) {
  return `\u00A5 ${Number(price).toFixed(2)}`;
}
