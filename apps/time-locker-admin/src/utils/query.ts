export function getQueryParams(query: Record<string, any>): string {
  const flatten = (
    obj: Record<string, any>,
    prefix = ""
  ): Record<string, string> =>
    Object.entries(obj).reduce((acc, [key, value]) => {
      const prefixedKey = prefix ? `${prefix}[${key}]` : key;

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(acc, flatten(value, prefixedKey));
      } else if (value !== undefined && value !== "") {
        acc[prefixedKey] = String(value);
      }

      return acc;
    }, {} as Record<string, string>);

  const flatParams = flatten(query);
  return new URLSearchParams(flatParams).toString();
}
