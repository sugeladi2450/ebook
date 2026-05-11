import { Alert, Table, Tabs } from "antd";
import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import DateRangeFilter from "../../components/statistics/DateRangeFilter";
import RankingBar from "../../components/statistics/RankingBar";
import usePageTitle from "../../hooks/usePageTitle";
import { formatPrice } from "../../utils/formatters";

export default function AdminStatisticsPage({ siteName }) {
  const { bookSales, errorMessage, filters, userConsumption } = useLoaderData();
  const maxBookQuantity = useMemo(
    () => Math.max(0, ...bookSales.map((item) => item.totalQuantity)),
    [bookSales],
  );
  const maxUserAmount = useMemo(
    () => Math.max(0, ...userConsumption.map((item) => item.totalAmount)),
    [userConsumption],
  );

  usePageTitle(`${siteName} - 统计管理`);

  const bookColumns = [
    {
      title: "排名",
      width: 72,
      render: (_, __, index) => index + 1,
    },
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
      title: "销量",
      dataIndex: "totalQuantity",
      width: 180,
      render: (value) => (
        <div className="statistics-rank-cell">
          <span>{value}</span>
          <RankingBar max={maxBookQuantity} value={value} />
        </div>
      ),
    },
    {
      title: "销售额",
      dataIndex: "totalAmount",
      width: 140,
      render: (value) => formatPrice(value),
    },
  ];

  const userColumns = [
    {
      title: "排名",
      width: 72,
      render: (_, __, index) => index + 1,
    },
    {
      title: "账号",
      dataIndex: "username",
      width: 140,
      ellipsis: true,
    },
    {
      title: "昵称",
      dataIndex: "nickname",
      width: 140,
      ellipsis: true,
      render: (value) => value || "未设置",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      ellipsis: true,
      render: (value) => value || "未填写",
    },
    {
      title: "购书本数",
      dataIndex: "totalBooks",
      width: 120,
    },
    {
      title: "累计消费",
      dataIndex: "totalAmount",
      width: 200,
      render: (value) => (
        <div className="statistics-rank-cell">
          <span>{formatPrice(value)}</span>
          <RankingBar max={maxUserAmount} value={value} />
        </div>
      ),
    },
  ];

  return (
    <section className="statistics-page" aria-label="统计管理">
      <header className="statistics-page__header">
        <div>
          <h1 className="statistics-page__title">统计管理</h1>
          <p className="statistics-page__subtitle">按指定时间范围生成图书热销榜和用户消费榜。</p>
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

      <section className="statistics-card" aria-label="统计结果">
        <Tabs
          items={[
            {
              key: "books",
              label: "图书热销榜",
              children: (
                <Table
                  columns={bookColumns}
                  dataSource={bookSales}
                  pagination={{ pageSize: 8, showTotal: (total) => `共 ${total} 种书籍` }}
                  rowKey="bookId"
                />
              ),
            },
            {
              key: "users",
              label: "用户消费榜",
              children: (
                <Table
                  columns={userColumns}
                  dataSource={userConsumption}
                  pagination={{ pageSize: 8, showTotal: (total) => `共 ${total} 位用户` }}
                  rowKey="userId"
                />
              ),
            },
          ]}
        />
      </section>
    </section>
  );
}
