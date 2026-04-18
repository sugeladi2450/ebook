export default function BookSearchForm({
  value,
  placeholder,
  buttonText,
  onChange,
  onCompositionStart,
  onCompositionEnd,
  onSubmit,
}) {
  return (
    <section className="books-search" aria-label="搜索书籍">
      <form className="books-search__form" role="search" onSubmit={onSubmit}>
        <input
          className="books-search__input"
          name="q"
          placeholder={placeholder}
          type="search"
          autoComplete="off"
          value={value}
          onChange={onChange}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
        />
        <button className="books-search__button" type="submit">
          {buttonText}
        </button>
      </form>
    </section>
  );
}
