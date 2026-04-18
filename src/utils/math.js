export function clampIndex(index, length) {
  return (index % length + length) % length;
}
