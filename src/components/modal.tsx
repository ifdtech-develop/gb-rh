/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import CandidateImg from "../assets/img/candidate.jpg";
import dynamic from "next/dynamic";
import { MInput } from "./modal/minput";
import { MTextArea } from "./modal/textarea";
import { MSelect } from "./modal/select";
import router, {Router, useRouter} from "next/router"
import axios from "axios";
import { useSnackbar } from "notistack";
import moment from "moment";

export function Modal({ row, id }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(row.status);
  const cancelButtonRef = useRef(null);

  console.log("director:", id);

  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async () => {
  
    try {
      await axios.put(`/api/candidate?id=${row.id}`, {
        status: status,
        director: id,
      });

      enqueueSnackbar("Candidato Atualizado com sucesso!", {
        variant: "success",
      });

      router.reload();
      setOpen(false);
      
    } catch (error) {
      enqueueSnackbar("Erro ao atualizar candidato!", {
        variant: "error",
      });
      console.error(error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => setOpen(true)}
      >
        Abrir modal
      </button>
      <Transition.Root show={open} as={Fragment}>
        <form>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            {/* show information from row data   */}

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  lg:w-full lg:max-w-5xl sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                          <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                            {/* form inside of modal */}
                            <div className="flex flex-col">
                              <div className="flex flex-row my-2">
                                <MInput
                                  type="text"
                                  label="Nome"
                                  value={row.name}
                                  disabled={true}
                                />
                                <MInput
                                  type="text"
                                  label="Solicitante"
                                  value={row.manager}
                                  disabled={true}
                                />
                                {/* </div>
                            <div className="flex flex-row  my-2"> */}
                                <MInput
                                  type="text"
                                  label="Área/Setor"
                                  value={row.sector}
                                  disabled={true}
                                />
                                <MInput
                                  type="text"
                                  label="Empresa"
                                  value={row.company}
                                  disabled={true}
                                />
                              </div>
                              <div className="flex flex-row  my-2">
                                <MInput
                                  type="text"
                                  label="Idiomas"
                                  value={row.languages}
                                  disabled={true}
                                />
                                <MInput
                                  type="text"
                                  label="Previsão de inicio"
                                  value={moment(row.start_date).format("DD/MM/YYYY")}
                                  disabled={true}
                                />
                                {/* </div>
                            <div className="flex flex-row  my-2"> */}
                                <MInput
                                  type="text"
                                  label="Escolaridade"
                                  value={row.schooling}
                                  disabled={true}
                                />
                                <MInput
                                  type="text"
                                  label="Cargo"
                                  value={row.vacancy}
                                  disabled={true}
                                />
                              </div>
                              <div className="flex flex-row  my-2">
                                <MInput
                                  type="text"
                                  label="Tipo de vaga"
                                  value={row.type_vacancy}
                                  disabled={true}
                                />
                                <MSelect
                                  onChange={(e) => setStatus(e.target.value)}
                                  label="Status"
                                  value={row.status}
                                />
                              </div>
                              <div className="flex flex-row  my-2"></div>
                              <div className="flex flex-row my-2">
                                <MTextArea
                                  label="Justificativa da contratação"
                                  value={row.hiring_justification}
                                  cols={55}
                                  rows={row.hiring_justification.length / 55}
                                  disabled
                                />
                                {/* </div>
                            <div className="flex flex-row my-2"> */}
                                <MTextArea
                                  label="Experiência"
                                  value={row.experience}
                                  rows={row.experience.length / 55}
                                  cols={55}
                                  disabled
                                />
                              </div>
                              <figcaption className="font-medium"></figcaption>
                            </div>
                          </div>
                        </figure>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={handleSubmit}
                      >
                        Ok
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </form>
      </Transition.Root>
    </>
  );
}
