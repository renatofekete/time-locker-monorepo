export const formatDateForInput = (isoString: string) => {
  if (!isoString) return "";
  return isoString.split("T")[0];
};

export const formatDateForApi = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toISOString();
};
export const readableDate = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
