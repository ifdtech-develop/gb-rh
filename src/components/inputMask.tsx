import React from "react";
import { Controller, RegisterOptions, UseFormRegister } from "react-hook-form";
import NumberFormat from "react-number-format";

type InputMaskProps = {
  controle: any;
  register?: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  nome: string;
  format: string;
  mask: string;
  onChange?: any;
};

export const InputMask = ({
  controle,
  register,
  registerOptions,
  nome,
  onChange,
  format,
  mask,
}: InputMaskProps) => {
  return (
    <Controller
      name={nome}
      control={controle}
      {...register(nome, {
        required: true,
        onChange,
      })}
      render={({ field: { name, value, onChange } }) => (
        <NumberFormat
          displayType="input"
          type="text"
          name={name}
          value={value}
          format={format}
          mask={mask}
          placeholder="Informe o seu CPF"
          onChange={onChange}
          className="bg-gray-200 appearance-none border-2 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        />
      )}
    />
  );
};
