import { useRef, useState } from "react";
import { GetServerSideProps } from "next";
import { getSession, GetSessionParams, signOut } from "next-auth/react";
import S3 from "react-aws-s3"
// import { S3Client, AbortMultipartUploadCommand, AbortMultipartUploadCommandInput } from "@aws-sdk/client-s3";



export const Form = ({ name, session, region, bucket, accessKeyId
  , secretAccessKey }) => {
  console.log("session", session?.user);

  console.log("submit", region);


  const config = {
    bucketName: bucket,
    dirname:"uploads",
    region,
    accessKeyId,
    secretAccessKey,
    s3Url: "https://gb-rh.s3.amazonaws.com",
  };

  // const client = new S3Client({ region });
  // const params: AbortMultipartUploadCommandInput = {
  //   Bucket: bucket,
  //   Key: null,
  //   UploadId: secretAccessKey,
  // };
  // const comand = new AbortMultipartUploadCommand(params);



  const fileInput: React.MutableRefObject<HTMLInputElement> = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    let file = fileInput.current.files[0];
    let newFileName = encodeURIComponent(fileInput.current.files[0].name.toLowerCase().replace(/[^a-z0-9 _-]+/gi, '-').replace(/\s+/g, '-'));
    console.log("file", file);
    // const newFileName = 'test-file';
    console.log("file name", newFileName);

    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName)
      .then(data => {
        console.log(data);
        if (data.status === 204) {
          console.log("success");
        }
      }).catch(err => {
        console.log({ err });
      });

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
              <button
                onClick={handleSubmit}
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="submit">
                Enviar
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit}>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Informação do candidato
              </h6>
              <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Nome
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue="Lucky" />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Sobrenome
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue="Jesse" />
                  </div>
                </div>
              <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Cargo
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue="Vaga 1" />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      E-mail
                    </label>
                    <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue="jesse@example.com" />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Telefone
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue="Vaga 1" />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                    Data de Nascimento
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue="Vaga 1" />
                  </div>
                </div>


              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Informação de contato
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Endereço
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Cidade
                    </label>
                    <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue="New York" />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      Pais
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue="United States" />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                      CEP
                    </label>
                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue="Postal Code" />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="file_input">Curriculo</label>
              <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" ref={fileInput} type="file" />
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
                      rows={4}
                      defaultValue={"Opa"} />
                  </div></div></div></form></div></div></div></section>
  );
}


export const getServerSideProps: GetServerSideProps = async ({ req }: GetSessionParams) => {
  const session = await getSession({ req });

  console.log("session", session);

  return {
    props: {
      name: session?.user.name ?? "Form",
      session: session,
      region: process.env.S3_REGION,
      bucket: process.env.S3_BUCKET,
      // folder: process.env.S3_FOLDER,
      accessKeyId: process.env.S3_KEY,
      secretAccessKey: process.env.S3_SECRET,
    },
  }

}
export default Form