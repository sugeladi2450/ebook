import { Button, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import OrderRow from "../../components/orders/OrderRow";
import usePageTitle from "../../hooks/usePageTitle";

export default function OrdersPage({ admin = false, pageData, siteName }) {
  const { filters = {}, orders } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const [bookName, setBookName] = useState(filters.bookName ?? "");
  const [startDate, setStartDate] = useState(filters.startDate ?? "");
  const [endDate, setEndDate] = useState(filters.endDate ?? "");
  const pageTitle = admin ? pageData.adminTitle : pageData.title;
  const pageSubtitle = admin ? pageData.adminSubtitle : pageData.subtitle;

  usePageTitle(`${siteName} - ${pageTitle}`);

  useEffect(() => {
    setBookName(filters.bookName ?? "");
    setStartDate(filters.startDate ?? "");
    setEndDate(filters.endDate ?? "");
  }, [filters.bookName, filters.startDate, filters.endDate]);

  function handleSearch() {
    const searchParams = new URLSearchParams();
    if (bookName.trim()) {
      searchParams.set("bookName", bookName.trim());
    }
    if (startDate) {
      searchParams.set("startDate", startDate);
    }
    if (endDate) {
      searchParams.set("endDate", endDate);
    }

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  }

  function handleReset() {
    setBookName("");
    setStartDate("");
    setEndDate("");
    navigate(location.pathname);
  }

  return (
    <section className="orders" aria-label={admin ? "订单管理" : "订单列表"}>
      <div className="site-card">
        <header className="orders__header">
          <div className="orders__heading">
            <h1 className="orders__title">{pageTitle}</h1>
            <p className="orders__subtitle">{pageSubtitle}</p>
          </div>
        </header>

        <div className="orders-filter" aria-label="订单筛选">
          <Input
            allowClear
            className="orders-filter__book"
            placeholder="按书籍名称搜索"
            value={bookName}
            onChange={(event) => setBookName(event.target.value)}
            onPressEnter={handleSearch}
          />
          <Input
            aria-label="开始日期"
            className="orders-filter__date"
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
          <Input
            aria-label="结束日期"
            className="orders-filter__date"
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
          <Space>
            <Button type="primary" onClick={handleSearch}>
              搜索
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
        </div>

        <div className="site-divider orders__divider" role="separator" aria-hidden="true"></div>

        <div className="orders__list" aria-label="订单列表">
          {orders.length > 0 ? (
            orders.map((order) => <OrderRow key={order.id} admin={admin} order={order} />)
          ) : (
            <p className="orders__empty">暂无订单</p>
          )}
        </div>
      </div>
    </section>
  );
}

