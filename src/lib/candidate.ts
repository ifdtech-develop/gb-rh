import {
  candidate,
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient();

type Pagination = {
  skip: 0 | number;
  take: 0 | number;
};

export const newCandidate = async ({
  cargo,
  address,
  city,
  country,
  dateBirth,
  email,
  firstName,
  lastName,
  phone,
  stage,
  status,
  state,
  curriculo,
  zip,
  about
}: candidate) => {
  await prisma.candidate.create({
    data: {
      cargo,
      address,
      city,
      country,
      dateBirth,
      email,
      firstName,
      lastName,
      phone,
      stage,
      status,
      state,
      curriculo,
      zip,
      about
    }
  });
}

export const getCandidates = async ({ take, skip }: Pagination) => {
  const candidateCount = await prisma.candidate.count()
  const info = await prisma.candidate.findMany({
    take,
    skip,
    orderBy: {
      id: "desc"
    }
  });
  return { data:info, total:candidateCount };
}