import { candidate, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const newCandidate = async ({ cargo, address, city, country, dateBirth, email, firstName, lastName, phone, stage, status, state, curriculo, zip }: candidate) => {
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
      zip      
    }
  })
}
