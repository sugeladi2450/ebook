import { Input } from "antd";

const { Search } = Input;

export default function SearchBar({
  keyword,
  onKeywordChange,
  onSearch,
  placeholder,
  buttonText,
}) {
  return (
    <section className="books-search" aria-label="搜索书籍">
      <div className="books-search__form">
        <Search
          allowClear
          className="books-search__search"
          enterButton={buttonText}
          placeholder={placeholder}
          size="large"
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          onSearch={onSearch}
        />
      </div>
    </section>
  );
}
