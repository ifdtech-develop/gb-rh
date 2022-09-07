import { NextApiResponse, NextApiRequest } from "next";
import { getCandidates, newCandidate } from "../../lib/candidate";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req

  if (method === 'POST') {
    // Handle POST request
    try {
      const data = await newCandidate(req.body);
      res.status(201).json({ message: 'Candidate created', data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

  }
  if (method === 'GET') {
    try {
      const { skip, take } = query;
      const data = await getCandidates({ skip: Number(skip), take: Number(take) });

      res.status(200).json({...data, message: 'Candidates found'});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
