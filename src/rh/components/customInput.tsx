import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

type InputProps = {
  register?: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  type: string;
  name: string;
  placeholder?: string;
};

export const CustomInput = ({
  register,
  registerOptions,
  type,
  name,
  placeholder,
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      id={name}
      {...register(name, {
        required: true,
      })}
      placeholder={placeholder}
      className="bg-gray-200 appearance-none border-2 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
    />
  );
};
