import { NextApiRequest, NextApiResponse } from "next";
import { getIventory } from "../../../lib/inventory";

export default async function Inventory(req: NextApiRequest, res: NextApiResponse) {

  const { method } = req;
  console.log("test get");
  
  
  if(method === "GET") {
    console.log("test get1");
    const data = await getIventory();
    return res.status(data.status).json(data.data);
  }

}
