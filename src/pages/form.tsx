import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Input } from "../components/input";
import { GetServerSideProps } from "next";
import { getSession, GetSessionParams, signOut } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import S3 from "react-aws-s3";
import { Controller, useForm } from "react-hook-form";
import { newCandidate } from "../lib/candidate";
import { useSnackbar } from "notistack";
import { MiniDrawer } from "../components/drawer";
import Image from "next/image";

import Logo from "../assets/img/logo.png";
import { Select } from "../components/Select";
import Router from "next/router";
import {
  company,
  schooling,
  sector,
  type_vacancy,
} from "../components/data/select";
const Form = ({
  changePage,
  region,
  bucket,
  accessKeyId,
  secretAccessKey,
  // company,
  user,
  id,
  api,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [companyName, setCompanyName] = useState();
  let onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  const schema = yup.object().shape({
    // name: yup.string().required("Este campo é obrigatório"),
    company: yup.string().required("Este campo é obrigatório"),
    sector: yup.string().required("Este campo é obrigatório"),
    type_vacancy: yup.string().required("Este campo é obrigatório"),
    // manager: yup.string().required("Este campo é obrigatório"),
    vacancy: yup.string().required("Este campo é obrigatório"),
    schooling: yup.string().required("Este campo é obrigatório"),
    hiring_justification: yup.string().required("Este campo é obrigatório"),
    experience: yup.string().required("Este campo é obrigatório"),
    languages: yup.string().required("Este campo é obrigatório"),
    start_forecast: yup
      .date()
      .required("Este campo é obrigatório")
      .min(new Date(), "Data inválida"),
    // document: yup
    //   .mixed()
    //   .test("required", "Documento é obrigatório", (file) => {
    //     if (file.length === 1) return true;
    //     return false;
    //   })
    //   .test(
    //     "type",
    //     "Only the following formats are accepted: .pdf and .doc",
    //     (value) => {
    //       return (
    //         value &&
    //         (value[0]?.type === "application/pdf" ||
    //           value[0]?.type === "application/msword")
    //       );
    //     }
    //   ),
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const config = {
    bucketName: bucket,
    dirname: "uploads",
    region,
    accessKeyId,
    secretAccessKey,
    s3Url: "https://gb-rh.s3.amazonaws.com",
  };

  const timetamp = new Date().getTime();

  const fileInput: React.MutableRefObject<HTMLInputElement> = useRef();
  const submit = async (data) => {
    console.log(data);

    // let file = data.document[0];
    // let type = file.type == "application/pdf" ? ".pdf" : ".doc";

    const isValidate = await schema.isValid(data);
    if (isValidate) {
      try {
        
       
          // let newFileName =
          //   timetamp +
          //   "-" +
          //   encodeURIComponent(
          //     file.name
          //       .toLowerCase()
          //       .replace(/[^a-z0-9 _-]+/gi, "-")
          //       .replace(/\s+/g, "-") + type
          //   );

          // const ReactS3Client = new S3(config);
          // ReactS3Client.uploadFile(file, newFileName).then((data) => {
          //   console.log(data);
          //   if (data.status === 204) {
          //     console.log("success");
          //   }
          // });
        

        await axios.post("/api/candidate", {
          name: "Não Informado",
          company: data.company,
          sector: data.sector,
          type_vacancy: data.type_vacancy,
          manager: user,
          vacancy: data.vacancy,
          schooling: data.schooling,
          hiring_justification: data.hiring_justification,
          experience: data.experience,
          languages: data.languages,
          start_forecast: data.start_forecast,
          document: "null",
          status: "pendente",
          userid: id,
        });
        enqueueSnackbar("Solicitação cadastrada com sucesso!", {
          variant: "success",
        });
        Router.push("/candidatos");
      } catch (error) {
        console.error(error.message);
        enqueueSnackbar(error.message, { variant: "error" });
      }
    }
  };

  return (
    <>
      <MiniDrawer title="Formulário de Indicação">
        <section className=" py-1 bg-blueGray-50">
          <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
              <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-blueGray-700 text-xl font-bold">
                    <Image src={Logo} alt="logo" />
                    {/* Formulário */}
                  </h6>
                </div>
                <div className="flex justify-center items-center">
                  <h6 className="text-blueGray-700 text-xl font-bold">
                    REQUISIÇÃO DE VAGA
                  </h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit(submit)}>
                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Informação do candidato
                  </h6>
                  <div className="flex flex-wrap">
                    {/* <Input
                      label="Nome do candidato"
                      name="name"
                      register={register}
                      message={`${errors?.name?.message || ""}`}
                      size="lg"
                    /> */}
                    <Controller
                      control={control}
                      name="company"
                      {...register("company", {
                        required: true,
                        // onChange: (e) => setCompanyName(e.target.value),
                      })}
                      render={({ field: { onChange, name, value } }) => (
                        <Select
                          label="Empresa"
                          name={name}
                          data={company}
                          onChange={onChange}
                          message={`${errors?.company?.message || ""}`}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="sector"
                      {...register("sector", {
                        required: true,
                        // onChange: (e) => setCompanyName(e.target.value),
                      })}
                      render={({ field: { onChange, name, value } }) => (
                        <Select
                          label="Área/Setor"
                          name={name}
                          data={sector}
                          onChange={onChange}
                          message={`${errors?.sector?.message || ""}`}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="type_vacancy"
                      {...register("type_vacancy", {
                        required: true,
                        // onChange: (e) => setCompanyName(e.target.value),
                      })}
                      render={({ field: { onChange, name, value } }) => (
                        <Select
                          label="Tipo de vaga"
                          name={name}
                          data={type_vacancy}
                          onChange={onChange}
                          message={`${errors?.type_vacancy?.message || ""}`}
                        />
                      )}
                    />
                    {/* <Input
                      label="Área/Setor"
                      name="sector"
                      register={register}
                      message={`${errors?.sector?.message || ""}`}
                    /> */}
                    {/* <Input
                      label="Tipo de vaga"
                      name="type_vacancy"
                      register={register}
                      message={`${errors?.type_vacancy?.message || ""}`}
                    /> */}
                    <Input
                      label="Gestor"
                      name="manager"
                      register={register}
                      message={`${errors?.manager?.message || ""}`}
                      defaultValue={user}
                      disabled={true}
                    />
                    <Input
                      label="Cargo"
                      name="vacancy"
                      register={register}
                      message={`${errors?.vacancy?.message || ""}`}
                    />
                    <Controller
                      control={control}
                      name="schooling"
                      {...register("schooling", {
                        required: true,
                        // onChange: (e) => setCompanyName(e.target.value),
                      })}
                      render={({ field: { onChange, name, value } }) => (
                        <Select
                          label="Escolaridade"
                          name={name}
                          data={schooling}
                          onChange={onChange}
                          message={`${errors?.schooling?.message || ""}`}
                        />
                      )}
                    />
                    <Input
                      label="Idioma"
                      name="languages"
                      register={register}
                      message={`${errors?.languages?.message || ""}`}
                    />
                    <Input
                      label="Previsão de inicio"
                      name="start_forecast"
                      register={register}
                      type="date"
                      message={`${errors?.start_forecast?.message || ""}`}
                    />
                  </div>
                  {/* <hr className="mt-6 border-b-1 border-blueGray-300" />
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        htmlFor="file_input"
                      >
                        Documento
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        ref={fileInput}
                        name="document"
                        {...register("document", { required: true, onChange })}
                        type="file"
                      />
                      <span className="text-xs text-red-600">{`${
                        errors?.document?.message || ""
                      }`}</span>
                    </div>
                  </div> */}
                  <hr className="mt-6 border-b-1 border-blueGray-300" />

                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold my-6"
                          htmlFor="grid-password"
                        >
                          Justificativa da contratação
                        </label>
                        <textarea
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("hiring_justification", {
                            required: false,
                            onChange,
                          })}
                          name="hiring_justification"
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="my-3 border-b-1 border-blueGray-300" />
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Experiência
                        </label>
                        <textarea
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("experience", {
                            required: false,
                            onChange,
                          })}
                          name="experience"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    // onClick={handleSubmit(submit)}
                    type="submit"
                    className="float-right bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-8 py-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </MiniDrawer>
    </>
  );
};

export default Form;
export const getServerSideProps: GetServerSideProps = async ({
  req,
}: GetSessionParams) => {
  const session = await getSession({ req });

  // const response = await axios.get(`${process.env.API}/estabelecimentos/filter`);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      region: process.env.S3_REGION,
      bucket: process.env.S3_BUCKET,
      accessKeyId: process.env.S3_KEY,
      secretAccessKey: process.env.S3_SECRET,
      // company: response.data,
      user: session.user.name,
      id: session.user.id,
      api: process.env.API,
    },
  };
};
