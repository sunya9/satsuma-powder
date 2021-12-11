export const formatDate = (
  dateString: string,
  withoutYear: boolean | undefined = false
) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const dayOfMonth = date.getDate().toString().padStart(2, "0");
  return withoutYear
    ? `${month}月${dayOfMonth}日`
    : `${year}年${month}月${dayOfMonth}日`;
};
