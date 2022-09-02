import ht from "date-fns/locale/ht";
import React, { HTMLInputTypeAttribute } from "react";
import { FieldError, RegisterOptions, UseFormRegister, ValidationRule } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  onChange?: any;
  register?: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  required?: string | ValidationRule<boolean>;
  message?: string;
  size?: "sm" | "md" | "lg";
  type?: HTMLInputTypeAttribute;
}

export function Input({ label, name, onChange, register, required, message, size, type }: Props) {
  let width: string;
  if (!size) width = "w-full lg:w-6/12 px-4";
  if (size === "md") width = "w-full lg:w-6/12 px-4";
  if (size === "lg") width = "w-full lg:w-12/12 px-4";
  if (size === "sm") width = "w-full lg:w-4/12 px-4";



  return (
    <div className={width}>
      <div className="relative w-full mb-3">
        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
          {label}
        </label>
        <input type={!type ? "text" : type}
          name={name}
          {...register(name, { required, onChange })}
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          defaultValue="" />
      </div>
      {<span className="text-xs text-red-600">{message}</span>}
    </div>
  );
}
