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
  name,
  company,
  sector,
  type_vacancy,
  manager,
  vacancy,
  schooling,
  hiring_justification,
  experience,
  languages,
  start_forecast,
  document,
  status,
  status2,
  userid
  
}: candidate) => {
  try {
    
    const data = await prisma.candidate.create({
      data: {
        name,
        company,
        sector,
        type_vacancy,
        manager,
        vacancy,
        schooling,
        hiring_justification,
        experience,
        languages,
        start_forecast,
        document,
        status,
        status2,
        userid
      }
    });

    return data;
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

export const getCandidateById = async (id: number) => {
  try {
    const info = await prisma.candidate.findUnique({
      where: {
        id
      }
    });
    return info;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect()
  }
}

export const updateCandidate = async (id: number, data: candidate) => {
  try {
    const info = await prisma.candidate.update({
      where: {
        id
      },
      data
    });
    return info;
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect()
  }
}