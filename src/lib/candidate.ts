import {
  candidate,
  PrismaClient
} from "@prisma/client";

const prisma = new PrismaClient();

export type PaginationProps = {
  skip: number;
  take: number;
};

export type CandidateProps = {
  data: candidate[];
  total: number;
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
  try {
    
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
  } catch (error) {
    console.log(error);
    
  } finally {
    await prisma.$disconnect()
  }
}

export const getCandidates = async ({ take, skip }: PaginationProps) => {
  try {
  const candidateCount = await prisma.candidate.count()
  const info = await prisma.candidate.findMany({
    take,
    skip,
    orderBy: {
      id: "desc"
    }
  });
  return { data: info, total: candidateCount } as CandidateProps;
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect()
  }

}