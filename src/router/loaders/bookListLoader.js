// 图书列表加载器：在页面渲染前，从 URL 中获取搜索关键词，过滤出匹配的图书列表，然后把数据返回给页面组件使用。
import { filterBooksByKeyword } from "../../services/books/bookQueryService";

// 创建图书列表加载器：接收 appData 作为参数，返回一个路由 Loader 函数 bookListLoader，这个函数会在页面渲染前被调用，接收一个包含 request 对象的参数，从 request.url 中解析出搜索关键词，然后调用 filterBooksByKeyword 函数过滤图书列表，最后返回一个包含 keyword 和 filteredBooks 的对象。
export function createBookListLoader(appData) {
  return function bookListLoader({ request }) {
    // 从 URL 中获取搜索关键词：使用 URL API 解析 request.url，利用 searchParams.get("q") 获取查询参数 q 的值，如果没有提供 q 参数，则默认使用空字符串。
    const url = new URL(request.url);
    const keyword = url.searchParams.get("q") ?? "";

    // 返回一个对象，包含当前搜索关键词 keyword 和匹配的图书列表 filteredBooks。返回的数据会自动传给对应的图书列表页面组件，组件直接用就行。
    return {
      keyword,
      filteredBooks: filterBooksByKeyword(appData.books, keyword),
    };
  };
}
