import { Button, DatePicker, Input, Select, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import OrderRow from "../../components/orders/OrderRow";
import usePageTitle from "../../hooks/usePageTitle";
import {
  DATE_RANGE_PRESETS,
  getPresetDateRange,
  resolvePresetFromFilters,
} from "../../utils/dateRangePresets";

export default function OrdersPage({ admin = false, pageData, siteName }) {
  const { filters = {}, orders } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const [bookName, setBookName] = useState(filters.bookName ?? "");
  const [rangeType, setRangeType] = useState(() => resolvePresetFromFilters(filters));
  const [startDate, setStartDate] = useState(filters.startDate ?? "");
  const [endDate, setEndDate] = useState(filters.endDate ?? "");
  const pageTitle = admin ? pageData.adminTitle : pageData.title;
  const pageSubtitle = admin ? pageData.adminSubtitle : pageData.subtitle;

  usePageTitle(`${siteName} - ${pageTitle}`);

  useEffect(() => {
    setBookName(filters.bookName ?? "");
    setRangeType(resolvePresetFromFilters(filters));
    setStartDate(filters.startDate ?? "");
    setEndDate(filters.endDate ?? "");
  }, [filters.bookName, filters.startDate, filters.endDate]);

  function navigateWithFilters(nextBookName, nextStartDate, nextEndDate) {
    const searchParams = new URLSearchParams();
    if (nextBookName.trim()) {
      searchParams.set("bookName", nextBookName.trim());
    }
    if (nextStartDate) {
      searchParams.set("startDate", nextStartDate);
    }
    if (nextEndDate) {
      searchParams.set("endDate", nextEndDate);
    }

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  }

  function handleRangeTypeChange(value) {
    setRangeType(value);

    if (value === "custom") {
      return;
    }

    const nextRange = getPresetDateRange(value);
    setStartDate(nextRange.startDate);
    setEndDate(nextRange.endDate);
    navigateWithFilters(bookName, nextRange.startDate, nextRange.endDate);
  }

  function handleSearch() {
    navigateWithFilters(bookName, startDate, endDate);
  }

  function handleReset() {
    setBookName("");
    setRangeType("");
    setStartDate("");
    setEndDate("");
    navigate(location.pathname);
  }

  function toDatePickerValue(value) {
    return value ? dayjs(value, "YYYY-MM-DD") : null;
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
          <Select
            className="orders-filter__preset"
            options={DATE_RANGE_PRESETS}
            value={rangeType}
            onChange={handleRangeTypeChange}
          />
          {rangeType === "custom" ? (
            <div className="orders-filter__custom" aria-label="自定义时间范围">
              <DatePicker
                aria-label="开始日期"
                className="orders-filter__date"
                format="YYYY年MM月DD日"
                placeholder="年/月/日"
                value={toDatePickerValue(startDate)}
                onChange={(date) => setStartDate(date ? date.format("YYYY-MM-DD") : "")}
              />
              <span className="orders-filter__separator">至</span>
              <DatePicker
                aria-label="结束日期"
                className="orders-filter__date"
                format="YYYY年MM月DD日"
                placeholder="年/月/日"
                value={toDatePickerValue(endDate)}
                onChange={(date) => setEndDate(date ? date.format("YYYY-MM-DD") : "")}
              />
            </div>
          ) : null}
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
