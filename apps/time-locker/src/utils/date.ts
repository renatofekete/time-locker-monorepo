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

export const readableDateTime = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
};
