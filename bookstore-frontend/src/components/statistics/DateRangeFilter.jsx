import { Button, DatePicker, Select, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DATE_RANGE_PRESETS,
  getPresetDateRange,
  resolvePresetFromFilters,
} from "../../utils/dateRangePresets";

export default function DateRangeFilter({ filters }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [rangeType, setRangeType] = useState(() => resolvePresetFromFilters(filters));
  const [startDate, setStartDate] = useState(filters.startDate ?? "");
  const [endDate, setEndDate] = useState(filters.endDate ?? "");

  useEffect(() => {
    setRangeType(resolvePresetFromFilters(filters));
    setStartDate(filters.startDate ?? "");
    setEndDate(filters.endDate ?? "");
  }, [filters.startDate, filters.endDate]);

  function navigateWithRange(nextStartDate, nextEndDate) {
    const searchParams = new URLSearchParams();
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
    navigateWithRange(nextRange.startDate, nextRange.endDate);
  }

  function handleSearch() {
    navigateWithRange(startDate, endDate);
  }

  function handleReset() {
    setRangeType("");
    setStartDate("");
    setEndDate("");
    navigate(location.pathname);
  }

  function toDatePickerValue(value) {
    return value ? dayjs(value, "YYYY-MM-DD") : null;
  }

  return (
    <div className="statistics-filter" aria-label="统计时间筛选">
      <Select
        className="statistics-filter__preset"
        options={DATE_RANGE_PRESETS}
        value={rangeType}
        onChange={handleRangeTypeChange}
      />

      {rangeType === "custom" ? (
        <div className="statistics-filter__custom" aria-label="自定义时间范围">
          <DatePicker
            aria-label="开始日期"
            className="statistics-filter__date"
            format="YYYY年MM月DD日"
            placeholder="年/月/日"
            value={toDatePickerValue(startDate)}
            onChange={(date) => setStartDate(date ? date.format("YYYY-MM-DD") : "")}
          />
          <span className="statistics-filter__separator">至</span>
          <DatePicker
            aria-label="结束日期"
            className="statistics-filter__date"
            format="YYYY年MM月DD日"
            placeholder="年/月/日"
            value={toDatePickerValue(endDate)}
            onChange={(date) => setEndDate(date ? date.format("YYYY-MM-DD") : "")}
          />
        </div>
      ) : null}

      <Space>
        <Button type="primary" onClick={handleSearch}>
          统计
        </Button>
        <Button onClick={handleReset}>重置</Button>
      </Space>
    </div>
  );
}
