export default function StringSlice(data, endSlice) {
  return data.length > endSlice ? data.slice(0, endSlice) + "..." : data;
}
