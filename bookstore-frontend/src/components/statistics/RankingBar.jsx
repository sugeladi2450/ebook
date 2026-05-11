export default function RankingBar({ max, value }) {
  const percent = max > 0 ? Math.max(4, Math.round((value / max) * 100)) : 0;

  return (
    <div className="statistics-bar" aria-hidden="true">
      <div className="statistics-bar__fill" style={{ width: `${percent}%` }} />
    </div>
  );
}

