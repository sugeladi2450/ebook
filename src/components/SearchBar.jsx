import { Input } from "antd";

const { Search } = Input;

export default function SearchBar({
  keyword,
  onKeywordChange,
  onSubmit,
  placeholder,
  buttonText,
}) {
  return (
    <section className="books-search" aria-label="搜索书籍">
      <form className="books-search__form" onSubmit={onSubmit}>
        <Search
          allowClear
          className="books-search__search"
          enterButton={buttonText}
          placeholder={placeholder}
          size="large"
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          onSearch={() => undefined}
        />
      </form>
    </section>
  );
}
