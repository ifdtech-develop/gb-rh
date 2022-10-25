import React, { useEffect } from "react";
import { InputMask } from "../rh/components/inputMask";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../rh/utils/validation";
import NumberFormat from "react-number-format";
import { getSession, signIn } from "next-auth/react";
import { log } from "console";
import { CustomInput } from "../rh/components/customInput";
import { SignInError } from "../rh/utils/errorLogin";
import { useRouter } from "next/router";

export default function Login() {
  const { error } = useRouter().query;
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });
  const handleLogin = async (data) => {
    const isValid = await userSchema.isValid(data);

    if (isValid) {
      const res = await signIn("credentials", {
        cpf: data.cpf
          .replaceAll(".", "")
          .replaceAll("-", "")
          .replaceAll("/", ""),
        senha: data.senha,

        callbackUrl: `${window.location.origin}/`,
      });
      if (res?.error) {
        enqueueSnackbar(res.error, { variant: "error" });
      }
    }
  };

  useEffect(() => {
    if (error) {      
      enqueueSnackbar("Você não tem permissão para acessar essa página.", { variant: "error" });
    }
  }, [error]);

  return (
    <div className="">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="bg-[url('/assets/img/rhBackground.svg')] h-screen flex flex-col justify-center items-center">
          <div className="bg-white p-16 rounded shadow-2xl">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">
              Entre com a sua conta
            </h2>
            <div>
              <label
                htmlFor="cpf"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                CPF
              </label>
              <InputMask
                controle={control}
                register={register}
                nome="cpf"
                format="###.###.###-##"
                mask="_"
              />
              {errors.cpf && (
                <p className="text-red-500 text-xs italic">
                  {errors.cpf.message.toString()}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Senha
              </label>
              <CustomInput register={register} type="password" name="senha" />
            </div>
            <div className="mt-6">
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onSubmit={handleSubmit(handleLogin)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
