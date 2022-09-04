import { useRef, useState } from "react";
import { Input } from '../components/input';
import { GetServerSideProps } from "next";
import { getSession, GetSessionParams, signOut } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import S3 from "react-aws-s3"
import { useForm } from 'react-hook-form'
import { newCandidate } from "../lib/candidate";
import { useSnackbar } from 'notistack';

export const Form = ({
  region,
  bucket,
  accessKeyId,
  secretAccessKey }) => {
  const { enqueueSnackbar } = useSnackbar();
  let onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  const schema = yup.object().shape({
    firstName: yup.string().required("Este campo é obrigatório"),
    lastName: yup.string().required("Este campo é obrigatório"),
    cargo: yup.string().required("Este campo é obrigatório"),
    email: yup.string().email().required("Este campo é obrigatório"),
    phone: yup.string().required("Este campo é obrigatório"),
    dateBirth: yup.date().required("Este campo é obrigatório").min(new Date('1900-01-01'), "Data inválida").max(new Date(), "Data inválida"),
    address: yup.string().required("Este campo é obrigatório"),
    city: yup.string().required("Este campo é obrigatório"),
    state: yup.string().required("Este campo é obrigatório"),
    zip: yup.string().required("Este campo é obrigatório"),
    about: yup.string(),
    curriculo: yup.mixed().test("required", "Curriculo é obrigatório", (file) => {
      if (file.length === 1) return true
      return false
    }).test("type", "Only the following formats are accepted: .pdf and .doc", (value) => {
      return value && (
        value[0]?.type === 'application/pdf' ||
        value[0]?.type === "application/msword"
      )
    }),
  });


  const { register, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) });


  const config = {
    bucketName: bucket,
    dirname: "uploads",
    region,
    accessKeyId,
    secretAccessKey,
    s3Url: "https://gb-rh.s3.amazonaws.com",
  };

  // console.log(watch("curriculo")); // watch input value by passing the name of it

  const timetamp = new Date().getTime()



  const fileInput: React.MutableRefObject<HTMLInputElement> = useRef();
  const submit = async (data) => {
    console.log(data);

    let file = data.curriculo[0];
    console.log("file", file.name);

    const isValidate = await schema.isValid(data);
    if (isValidate) {
      try {
        const type = file.type === 'application/pdf' ? '.pdf' : '.doc';

        let newFileName = timetamp + "-" + encodeURIComponent(file.name.toLowerCase().replace(/[^a-z0-9 _-]+/gi, '-').replace(/\s+/g, '-') + type);

        const ReactS3Client = new S3(config);
        ReactS3Client.uploadFile(file, newFileName)
          .then(data => {
            console.log(data);
            if (data.status === 204) {
              console.log("success");
            }
          })

        await axios.post("/api/candidate", {
          firstName: data.firstName,
          lastName: data.lastName,
          cargo: data.cargo,
          email: data.email,
          phone: data.phone,
          dateBirth: data.dateBirth,
          address: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
          about: data.about,
          curriculo: newFileName,
          status: "pending",
          country: "Brasil",
          stage: "1"

        })
        enqueueSnackbar('Candidato cadastrado com sucesso!', { variant: 'success' });


      } catch (error) {
        console.error(error.message);
        enqueueSnackbar(error.message, { variant: 'error' });

      }




    }
  }

  return (
    <section className=" py-1 bg-blueGray-50">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Formulário
              </h6>

            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit(submit)}>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Informação do candidato
              </h6>
              <div className="flex flex-wrap">
                <Input label="Nome" name="firstName" register={register} message={`${errors?.firstName?.message || ""}`} />
                <Input label="Sobrenome" name="lastName" register={register} message={`${errors?.lastName?.message || ""}`} />
                <Input label="Cargo" name="cargo" register={register} message={`${errors?.cargo?.message || ""}`} />
                <Input label="Email" name="email" register={register} message={`${errors?.email?.message || ""}`} type="email" />
                <Input label="Telefone" name="phone" register={register} message={`${errors?.phone?.message || ""}`} type="tel" />
                <Input label="Data de Nascimento" name="dateBirth" register={register} message={`${errors?.dateBirth?.message || ""}`} type="date" />

              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Informação de contato
              </h6>
              <div className="flex flex-wrap">
                <Input label="Endereço" name="address" register={register} message={`${errors?.address?.message || ""}`} size="lg" />
                <Input label="Cidade" name="city" register={register} message={`${errors?.city?.message || ""}`} size="sm" />
                <Input label="Estado" name="state" register={register} message={`${errors?.state?.message || ""}`} size="sm" />
                <Input label="CEP" name="zip" register={register} message={`${errors?.zip?.message || ""}`} size="sm" />
              </div>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="file_input">Curriculo</label>
                  <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input"
                    ref={fileInput}
                    name="curriculo"
                    {...register("curriculo", { required: true, onChange })}
                    type="file" />
                  <span className="text-xs text-red-600">{`${errors?.curriculo?.message || ""}`}</span>
                </div>
              </div>


              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Sobre mim
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Informações adicionais
                    </label>
                    <textarea className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("about", { required: false, onChange })}
                      name="about"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              <button
                // onClick={handleSubmit(submit)}
                type="submit"
                className="float-right bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-8 py-4 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


export const getServerSideProps: GetServerSideProps = async ({ req }: GetSessionParams) => {
  // const session = await getSession({ req });

  // console.log("session", session);

  return {
    props: {
      region: process.env.S3_REGION,
      bucket: process.env.S3_BUCKET,
      accessKeyId: process.env.S3_KEY,
      secretAccessKey: process.env.S3_SECRET,
    },
  }

}
export default Form