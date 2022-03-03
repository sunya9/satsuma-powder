export const formatDate = (dateString: string, withoutyear?: true) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const dayOfMonth = date.getDate().toString().padStart(2, "0");

  const yearStr = withoutyear ? "" : `${year}年`;
  return `${yearStr}${month}月${dayOfMonth}日`;
};
