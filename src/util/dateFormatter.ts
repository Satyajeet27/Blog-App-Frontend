export const formatDate = (requestedDate: Date) => {
  const date = new Date(requestedDate);
  const formattedDate = date
    .toLocaleDateString("en-us", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(",", " ");
  return formattedDate;
};
