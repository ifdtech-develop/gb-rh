import axios from "axios";
import { NextApiResponse, NextApiRequest } from "next";
type Props = {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  paf?: {
    id_paf: number;
    paf_name: string;
    endereco: string;
  };
  atendente: boolean;
  accessToken: string;
  tokenType: string;
  role: number;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.post(`${process.env.API}/auth/login`, {
    // const response = await axios.post(`http://3.135.200.237:3000/auth/login`, {
      cpf: req.body.cpf,
      senha: req.body.senha,
    });

    const data = (await response.data) as Props;
    // if (!data.atendente) {
    //   return res
    //     .status(401)
    //     .json({ message: "Você não tem permissão para acessar essa página" });
    // }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
};
