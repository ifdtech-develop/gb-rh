import { NextApiResponse, NextApiRequest } from "next";
import {
  getCandidates,
  newCandidate,
  updateCandidate,
} from "../../rh/lib/candidate";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;

  if (method === "POST") {
    // Handle POST request
    try {
      const data = await newCandidate(req.body);
      res.status(201).json({ message: "Candidate created", data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  if (method === "GET") {
    try {
      const { skip, take } = query;
      const data = await getCandidates({
        skip: Number(skip),
        take: Number(take),
      });

      res.status(200).json({ ...data, message: "Candidates found" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  if (method === "PUT") {
    // Handle PUT request,
    // update candidate

    try {
      const { id } = query;
      const data = await updateCandidate(Number(id), req.body);
      res.status(201).json({ message: "Candidate updated", data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
