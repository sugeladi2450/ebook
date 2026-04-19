// ID查询函数：接收图书数组和图书 ID，利用数组的 find 方法查找匹配 ID 的图书，找到就返回这本书的对象，找不到则返回 undefined。
export function findBookById(books, bookId) {
  return books.find((book) => book.id === bookId);
}

// 关键词匹配函数：接收一本书和一个搜索关键词，首先检查关键词是否为空或仅包含空格，如果是，则返回 true（表示所有书都匹配）。否则，将关键词转换为小写，并检查书的标题、作者和 ISBN 是否包含这个关键词（也转换为小写）。如果任意一个字段包含关键词，就返回 true，否则返回 false。
export function matchesBookKeyword(book, keyword) {
  if (!keyword.trim()) {
    return true;
  }

  // 把搜索词统一转成小写，实现不区分大小写搜索
  const normalizedKeyword = keyword.trim().toLowerCase();

  return [book.title, book.author, book.isbn]
    .join(" ")
    .toLowerCase()
    .includes(normalizedKeyword);
}

// 过滤函数：接收图书数组和搜索关键词，利用数组的 filter 方法对每本书调用 matchesBookKeyword 函数，返回一个新的数组，包含所有匹配搜索关键词的书籍。
export function filterBooksByKeyword(books, keyword) {
  return books.filter((book) => matchesBookKeyword(book, keyword));
}
