import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import React from "react";
import { CandidateProps } from "../../lib/candidate";
import { CustomPaginationActionsTable } from "../../components/table/TablePaginationActionsProps";

export default function Page({ data, total, name, id }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <div className="flex justify-between ">
          <h1 className="text-2xl pl-4"> Olá {name}</h1>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => signOut()}
          >
            Sair
          </button>
        </div>
      </header>

      <main className="flex-grow flex mb-4 ">
        <div className="flex flex-col w-2/12 justify-between">
          {/* add a list of menu options */}
          {/* <ul className="flex flex-col ml-8">
            <li className="p-2 text-2xl">Candidatos</li>
            <li className="p-2 text-2xl">Vagas</li>
            <li className="p-2 text-2xl">Entrevistas</li>
            <li className="p-2 text-2xl">Relatórios</li>
          </ul>
          <ul className="flex flex-col ml-8">
            <li className="p-2 mb-2 text-2xl">Sair</li>
          </ul> */}
        </div>
        <div className="w-2/3 h-1/2 m-4">
          <h3 className="text-2xl my-8 mt-4"> Candidatos</h3>
          <CustomPaginationActionsTable data={data} total={total} />
        </div>
      </main>

    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  console.log("session: ", session);

  const response = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/candidate`,
    {
      params: {
        skip: 0,
        take: 10,
      },
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );
  const data: CandidateProps = await response.data;
  if (data) {
    return {
      props: {
        title: "Table Pagination Actions",
        data: data.data,
        total: data.total,
        name: session.user.name,
        id: session.user.id,
      },
    };
  }
};
