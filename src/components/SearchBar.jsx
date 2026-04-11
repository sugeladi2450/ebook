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
        <input
          className="books-search__input"
          type="search"
          name="q"
          placeholder={placeholder}
          aria-label={placeholder}
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
        />
        <button className="books-search__button" type="submit">
          {buttonText}
        </button>
      </form>
    </section>
  );
}

