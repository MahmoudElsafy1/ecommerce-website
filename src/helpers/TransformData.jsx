export default function TransformData(data) {
  const selectData = new window.Date(data);
  const getFullYear = selectData.getFullYear();
  const getFullMonth = (selectData.getMonth() + 1).toString().padStart(2, "0");
  const getFullDay = selectData.getDay().toString().padStart(2, "0");
  return `${getFullYear}-${getFullMonth}-${getFullDay}`;
}
