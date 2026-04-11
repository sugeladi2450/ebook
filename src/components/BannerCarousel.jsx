import { useEffect, useState } from "react";

function clampIndex(index, length) {
  return (index % length + length) % length;
}

export default function BannerCarousel({ banners }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => clampIndex(current + 1, banners.length));
    }, 3000);

    return () => window.clearInterval(timer);
  }, [banners.length]);

  return (
    <section className="books-carousel" aria-label="书籍推荐轮播图">
      <div className="books-carousel__viewport" aria-label="轮播图区域">
        <div
          className="books-carousel__track"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {banners.map((banner) => (
            <img
              key={banner.id}
              className="books-carousel__img"
              src={banner.image}
              alt={banner.alt}
              loading="lazy"
            />
          ))}
        </div>

        <button
          className="books-carousel__arrow books-carousel__arrow--prev"
          type="button"
          aria-label="上一张"
          onClick={() => setIndex((current) => clampIndex(current - 1, banners.length))}
        >
          ‹
        </button>
        <button
          className="books-carousel__arrow books-carousel__arrow--next"
          type="button"
          aria-label="下一张"
          onClick={() => setIndex((current) => clampIndex(current + 1, banners.length))}
        >
          ›
        </button>
      </div>

      <div className="books-carousel__dots" aria-label="轮播指示器">
        {banners.map((banner, bannerIndex) => (
          <button
            key={banner.id}
            className={
              bannerIndex === index
                ? "books-carousel__dot books-carousel__dot--active"
                : "books-carousel__dot"
            }
            type="button"
            aria-label={`第 ${bannerIndex + 1} 张`}
            aria-current={bannerIndex === index ? "true" : "false"}
            onClick={() => setIndex(bannerIndex)}
          />
        ))}
      </div>
    </section>
  );
}

