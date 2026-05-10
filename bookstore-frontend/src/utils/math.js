// 计算一个安全的、循环的索引值
export function clampIndex(index, length) {
  return (index % length + length) % length;
}
