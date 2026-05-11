import { Alert, Table } from "antd";
import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import DateRangeFilter from "../../components/statistics/DateRangeFilter";
import RankingBar from "../../components/statistics/RankingBar";
import usePageTitle from "../../hooks/usePageTitle";
import { formatPrice } from "../../utils/formatters";

export default function UserStatisticsPage({ siteName }) {
  const { errorMessage, filters, stats } = useLoaderData();
  const maxQuantity = useMemo(
    () => Math.max(0, ...stats.books.map((item) => item.totalQuantity)),
    [stats.books],
  );

  usePageTitle(`${siteName} - 我的统计`);

  const columns = [
    {
      title: "书名",
      dataIndex: "title",
      ellipsis: true,
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      width: 160,
      render: (value) => value || "未填写",
    },
    {
      title: "购买本数",
      dataIndex: "totalQuantity",
      width: 180,
      render: (value) => (
        <div className="statistics-rank-cell">
          <span>{value}</span>
          <RankingBar max={maxQuantity} value={value} />
        </div>
      ),
    },
    {
      title: "消费金额",
      dataIndex: "totalAmount",
      width: 140,
      render: (value) => formatPrice(value),
    },
  ];

  return (
    <section className="statistics-page" aria-label="我的统计">
      <header className="statistics-page__header">
        <div>
          <h1 className="statistics-page__title">我的统计</h1>
          <p className="statistics-page__subtitle">按时间范围统计你购买过的每种书、总本数和总金额。</p>
        </div>
      </header>

      <section className="statistics-card" aria-label="统计条件">
        <DateRangeFilter filters={filters} />
      </section>

      {errorMessage ? (
        <Alert
          showIcon
          message="统计数据加载失败"
          description={errorMessage}
          type="error"
        />
      ) : null}

      <section className="statistics-summary" aria-label="汇总数据">
        <div className="statistics-summary__item">
          <span className="statistics-summary__label">购书总本数</span>
          <strong className="statistics-summary__value">{stats.totalBooks}</strong>
        </div>
        <div className="statistics-summary__item">
          <span className="statistics-summary__label">购书总金额</span>
          <strong className="statistics-summary__value">{formatPrice(stats.totalAmount)}</strong>
        </div>
        <div className="statistics-summary__item">
          <span className="statistics-summary__label">涉及书籍种类</span>
          <strong className="statistics-summary__value">{stats.books.length}</strong>
        </div>
      </section>

      <section className="statistics-card" aria-label="购买书籍统计">
        <Table
          columns={columns}
          dataSource={stats.books}
          pagination={{ pageSize: 8, showTotal: (total) => `共 ${total} 种书籍` }}
          rowKey="bookId"
        />
      </section>
    </section>
  );
}
