import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession, GetSessionParams } from "next-auth/react";
import React, { useState } from "react";
import { MiniDrawer } from "../rh/components/drawer";
import  Candidates  from "./candidatos";
import  Form  from "./form";
import { CandidateProps } from "../rh/lib/candidate";

const Page = ({
  data,
  total,
  name,
  id,
  companys,
  region,
  bucket,
  accessKeyId,
  secretAccessKey,
  company,
  api
}) => {
  const [page, setPage] = useState("form");

  const Pages = () => {
    let pages = {
      form: (
        <Form
          changePage={(props) => setPage(props)}
          id={id}
          accessKeyId={accessKeyId}
          // company={company}
          region={region}
          secretAccessKey={secretAccessKey}
          bucket={bucket}
          user={name}
          api={api}
        />
      ),

      candidates: (
        <Candidates
          changePage={(props) => setPage(props)}
          data={data}
          total={total}
          companys={companys}
          id={id}
          name={name}
        />
      ),
    };

    return pages[page];
  };

  return (
    <>
      <MiniDrawer>
        <Pages />
      </MiniDrawer>
    </>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async ({
  req,
}: GetSessionParams) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/candidatos",
      permanent: false,
    },
  };
};

  // const response = await axios.get(`${process.env.API}/estabelecimentos/filter`);

  //  const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/candidate`, {
  //   params: {
  //     skip: 0,
  //     take: 10,
  //   },
  //   headers: {
  //     Authorization: `Bearer ${session.accessToken}`,
  //   },
  // });

  // const data: CandidateProps = await res.data;

  // return {
  //   props: {
  //     region: process.env.S3_REGION,
  //     bucket: process.env.S3_BUCKET,
  //     accessKeyId: process.env.S3_KEY,
  //     secretAccessKey: process.env.S3_SECRET,
  //     company: response.data,
  //     user: session.user.name,
  //     id: session.user.id,
  //     data: data.data,
  //     total: data.total,
  //     api: process.env.API,
  //   },
  // };

