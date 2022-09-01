import axios from "axios";

export async function getIventory() {
  const resData = await axios.get('http://localhost:3000/api/v1/reports/list')

  return resData;
}