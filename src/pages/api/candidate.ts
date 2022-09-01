import { NextApiResponse, NextApiRequest } from "next";
import { newCandidate } from "../../lib/candidate";

export default async (req: NextApiRequest, res: NextApiResponse) => {
const {method} = req
  
if(method === 'POST') {
  // Handle POST request
  const data = await newCandidate(req.body);

  res.status(201).json({ data });

}
};
