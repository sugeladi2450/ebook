function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date, days) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

export const DATE_RANGE_PRESETS = [
  { label: "全部时间", value: "" },
  { label: "今天", value: "today" },
  { label: "昨天", value: "yesterday" },
  { label: "近7天", value: "week" },
  { label: "近30天", value: "month" },
  { label: "自定义时间范围", value: "custom" },
];

export function getPresetDateRange(preset) {
  const today = new Date();
  const todayText = formatDate(today);

  if (preset === "today") {
    return {
      startDate: todayText,
      endDate: todayText,
    };
  }

  if (preset === "yesterday") {
    const yesterdayText = formatDate(addDays(today, -1));
    return {
      startDate: yesterdayText,
      endDate: yesterdayText,
    };
  }

  if (preset === "week") {
    return {
      startDate: formatDate(addDays(today, -6)),
      endDate: todayText,
    };
  }

  if (preset === "month") {
    return {
      startDate: formatDate(addDays(today, -29)),
      endDate: todayText,
    };
  }

  return {
    startDate: "",
    endDate: "",
  };
}

export function resolvePresetFromFilters(filters) {
  return filters.startDate || filters.endDate ? "custom" : "";
}

