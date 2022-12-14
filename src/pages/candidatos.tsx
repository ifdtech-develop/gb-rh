import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import React from "react";
import { CandidateProps } from "../rh/lib/candidate";
import { CustomPaginationActionsTable } from "../rh/components/table/TablePaginationActionsProps";
import { MiniDrawer } from "../rh/components/drawer";
import { Grid } from "@mui/material";

const Candidates = ({ data, total, name, id, companys, changePage }) => {
  return (
    <>
      <MiniDrawer title={"Olá " + name}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow flex mb-4 ">
            <div className="h-1/2 m-4">
              <h3 className="text-2xl my-4"> Vagas</h3>
              <div className="flex justify-center">
                <CustomPaginationActionsTable
                  data={data}
                  total={total}
                  id={id}
                />
              </div>
            </div>
          </main>
        </div>
      </MiniDrawer>
    </>
  );
};

export default Candidates;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

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

  // const res = await axios.get(`${process.env.API}/estabelecimentos/filter`);
  // const companys = await res.data;
  const data: CandidateProps = await response.data;

  if (data) {
    return {
      props: {
        title: "Table Pagination Actions",
        data: data.data,
        total: data.total,
        name: session.user.name,
        id: session.user.id,
        user: session.user,
        // companys: companys,
      },
    };
  }
};
