import dayjs from "dayjs";

export const disabledDate = (current) => {
  const startOfToday = dayjs().startOf("day");
  return current && current < startOfToday;
};
