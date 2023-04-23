export const toClassName = (...values: (boolean | string | undefined)[]) =>
  values.filter(Boolean).join(' ');

export const handleFormatOptionsToStrings = (
  items: { label: string; value: any }[],
) => items?.map((item) => item.value);
