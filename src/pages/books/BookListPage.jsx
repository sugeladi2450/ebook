import { useLoaderData } from "react-router-dom";
import BannerCarousel from "../../components/books/BannerCarousel";
import BookCard from "../../components/books/BookCard";
import BookSearchForm from "../../components/books/BookSearchForm";
import useBookSearch from "../../hooks/useBookSearch";
import usePageTitle from "../../hooks/usePageTitle";

export default function BookListPage({ banners, pageData, siteName }) {
  const { filteredBooks, keyword } = useLoaderData(); //接收 bookListLoader 处理好的 filteredBooks 和 keyword
  const search = useBookSearch(keyword); //自定义 Hook，把搜索框的逻辑（输入、提交、跳转）封装起来，让页面代码更干净。

  usePageTitle(`${siteName} - ${pageData.title}`); //自定义 Hook，用来动态设置浏览器标签页标题，让每个页面标题不一样，体验更好。

  return (
    <section className="books" aria-label="书籍列表">
      <div className="site-card">
        <header className="books__header">
          <div className="books__heading">
            <h1 className="books__title">{pageData.title}</h1>
            <p className="books__subtitle">{pageData.subtitle}</p>
          </div>

          <div className="books__meta" aria-label="列表信息">
            <span className="books__chip">共 {filteredBooks.length} 本</span>
            <span className="books__chip">{pageData.gridChipText}</span>
          </div>
        </header>

        // 搜索表单组件：接收输入框的值、占位文本、按钮文本和各种事件处理函数作为 props，渲染一个搜索表单，用户可以在输入框输入关键词，点击搜索按钮或者按回车键提交表单，触发对应的事件处理函数来更新搜索状态和跳转页面。
        <BookSearchForm
          value={search.inputValue}
          placeholder={pageData.searchPlaceholder}
          buttonText={pageData.searchButtonText}
          onChange={search.handleInputChange}
          onCompositionStart={search.handleCompositionStart}
          onCompositionEnd={search.handleCompositionEnd}
          onSubmit={search.handleSubmit}
        />

        <BannerCarousel banners={banners} />

        <div className="site-divider books__divider" role="separator" aria-hidden="true"></div>

        <div className="books__grid" aria-label="书籍网格">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
